"use client";

import { createContext, ReactNode, useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { NEXT_PUBLIC_SERVER_URL } from "@/config.js";
import { UserData, SocketContextType } from "@/utils/types";
import {
    addAnswer,
    getPeerConnection,
    getPeerConnectionAnswer,
    getPeerConnectionOffer,
} from "@/utils/peer";

export const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);

    const [peerConnection, setPeerConnection] = useState(null);

    const [partnerName, setPartnerName] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [roomID, setRoomID] = useState(null);

    const messagesEndRef = useRef(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    // Getting and Setting up user media streams
    const getUserMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Media setup error:", error);
        }
    };

    useEffect(() => {
        getUserMedia().then(() => {
            const socketConnection = io(NEXT_PUBLIC_SERVER_URL);

            socketConnection.on("connect", async () => {
                console.log("Connected to socket:", socketConnection.id);
                setSocket(socketConnection);
            });

            socketConnection.on("disconnect", () => {
                console.log("Disconnected from socket");
            });

            socketConnection.on("partner_found", async (data) => {
                setPartnerName(data.username);
                setRoomID(data.roomID);
                setIsSearching(false);
                setIsConnected(true);

                if (data.isInitiator) {
                    const { offer, peerConnection } =
                        await getPeerConnectionOffer(
                            localVideoRef,
                            remoteVideoRef,
                            socketConnection,
                            data.roomID,
                        );

                    setPeerConnection(peerConnection);

                    socketConnection.emit("add_offer", {
                        offer,
                        roomID: data.roomID,
                    });
                }
            });

            socketConnection.on("add_offer", async (data) => {
                const { answer, peerConnection } =
                    await getPeerConnectionAnswer(
                        localVideoRef,
                        remoteVideoRef,
                        socketConnection,
                        data.roomID,
                        data.offer,
                    );

                setPeerConnection(peerConnection);

                socketConnection.emit("add_answer", {
                    answer: answer,
                    roomID: data.roomID,
                });
            });

            socketConnection.on("add_answer", async (data) => {
                console.log("Add answer", data);
                await addAnswer(data.answer);
            });

            socketConnection.on("ice_candidates", async (data) => {
                await handleIceCandidates(data.candidates);
            });

            socketConnection.on("receive_message", (messageData) => {
                setMessages((prevMessages) => [...prevMessages, messageData]);
            });

            socketConnection.on("partner_disconnected", () => {
                setIsConnected(false);
                setRoomID(null);

                alert("Your partner has disconnected");
            });
        });
    }, []);

    const handleIceCandidates = async (candidate) => {
        const peerConnection = await getPeerConnection(
            localVideoRef,
            remoteVideoRef,
            socket,
            roomID,
        );
        if (candidate) {
            console.log("Adding ICE candidates:", candidate);
            console.log(peerConnection);
            try {
                await peerConnection.addIceCandidate(candidate);
            } catch (error) {
                console.error("Error adding ICE candidate:", error);
            }
        }
    };

    const findPartner = (userdata: UserData) => {
        setIsSearching(true);
        if (socket) {
            socket.emit("find_partner", userdata);
        }
    };

    const sendMessage = (message: string) => {
        if (message.trim() && roomID && socket) {
            socket.emit("send_message", {
                roomID,
                message,
            });
        }
    };

    const disconnectChat = (userdata) => {
        setIsConnected(false);
        setRoomID(null);

        findPartner(userdata);
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                partnerName,
                messages,
                roomID,
                isConnected,
                messagesEndRef,
                localVideoRef,
                remoteVideoRef,
                findPartner,
                sendMessage,
                disconnectChat,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}
