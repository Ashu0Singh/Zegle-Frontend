"use client";

import { createContext, ReactNode, useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { UserData, SocketContextType } from "@/utils/types";
import {
    addAnswer,
    closePeerConnection,
    getPeerConnectionAnswer,
} from "@/utils/peer";
import { useUserContext } from "@/hooks/use-user";
import {
    setupMediaStream,
    handleIceCandidates,
    handlePartnerFound,
    disconnectChat,
} from "@/utils/socket-utils";
import { NEXT_PUBLIC_SERVER_URL } from "@/config.js";
import { toast } from "@/hooks/use-toast";

export const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket>();
    const [partnerName, setPartnerName] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [roomID, setRoomID] = useState<string | null>(null);

    const messagesEndRef = useRef(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const { userData } = useUserContext();

    const connectToSocket = async () => {
        try {
            await setupMediaStream(localVideoRef);
        } catch {
            toast({
                title: "Camera and microphone access required",
                description:
                    "Please allow camera and microphone access to start chatting",
            });
            return null;
        }
        if (!socket) {
            const socketConnection = io(NEXT_PUBLIC_SERVER_URL);

            socketConnection.on("connect", () => {
                setSocket(socketConnection);
                closePeerConnection(remoteVideoRef);
            });

            socketConnection.on("disconnect", () => {
                socketConnection.close();
                setSocket(null);
                setPartnerName(null);   
                setRoomID(null);
                setIsConnected(false);
                closePeerConnection(remoteVideoRef);
            });

            socketConnection.on("partner_found", (data) =>
                handlePartnerFound(
                    data,
                    localVideoRef,
                    remoteVideoRef,
                    socketConnection,
                    {
                        setPartnerName,
                        setRoomID,
                        setIsSearching,
                        setIsConnected,
                    },
                ),
            );

            socketConnection.on("add_offer", async (data) => {
                const { answer } = await getPeerConnectionAnswer(
                    localVideoRef,
                    remoteVideoRef,
                    socketConnection,
                    data.roomID,
                    data.offer,
                );
                socketConnection.emit("add_answer", {
                    answer,
                    roomID: data.roomID,
                });
            });

            socketConnection.on(
                "add_answer",
                async (data) => await addAnswer(data.answer),
            );
            socketConnection.on(
                "ice_candidates",
                async (data) =>
                    await handleIceCandidates(
                        data.candidates,
                        localVideoRef,
                        remoteVideoRef,
                        socketConnection,
                        roomID,
                    ),
            );
            socketConnection.on("receive_message", (messageData) =>
                setMessages((prev) => [...prev, messageData]),
            );
            socketConnection.on("partner_disconnected", () =>
                disconnectChat(
                    userData,
                    socketConnection,
                    {
                        setIsConnected,
                        setRoomID,
                        setPartnerName,
                    },
                    remoteVideoRef,
                    findPartner,
                ),
            );

            return socketConnection;
        }
        return socket;
    };

    const findPartner = async (userData: UserData, socket: Socket) => {
        setIsSearching(true);
        const socketConnection = socket || (await connectToSocket());
        if (isConnected && socketConnection) {
            socketConnection?.emit("disconnect_partner", { roomID });
            setIsConnected(false);
            setRoomID(null);
            setPartnerName(null);
            closePeerConnection(remoteVideoRef);
        }
        socketConnection && socketConnection?.emit("find_partner", userData);
    };

    const stopChatting = () => {
        if (socket && isConnected && roomID) {
            socket.disconnect();
            setIsConnected(false);
            setRoomID(null);
            setPartnerName(null);
            closePeerConnection(remoteVideoRef);
        } else if (!isConnected) {
            socket?.disconnect();
        }
    };

    const sendMessage = (message: string) => {
        if (message.trim() && roomID && socket) {
            socket.emit("send_message", { roomID, message });
        }
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
                stopChatting,
                findPartner,
                sendMessage,
                disconnectChat,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}
