"use client";

import { createContext, ReactNode, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { NEXT_PUBLIC_SERVER_URL } from "@/config.js";
import { generateUUID } from "@/utils/generateUUID.js";
import axios from "@/utils/axios.js";
import { UserData, SocketContextType, UserContextType } from "@/utils/types";

export const SocketContext = createContext<SocketContextType | null>(null);
export const UserContext = createContext<UserContextType | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [partnerName, setPartnerName] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([
        {
            username: "ashu.simgh",
            message: "Supp bro whatcha upto? ",
            timestamp: "2024-12-15T05:46:34.624Z",
        },
        {
            username: "2977770100",
            message: "All good man? How's your wife? ",
            timestamp: "2024-12-15T05:46:47.807Z",
        },
        {
            username: "ashu.simgh",
            message: "Pretty good pretty good!",
            timestamp: "2024-12-15T05:41:03.743Z",
        },
        {
            username: "ashu.simgh",
            message: "Supp bro whatcha upto? ",
            timestamp: "2024-12-15T15:46:34.624Z",
        },
        {
            username: "2977770100",
            message: "All good man? How's your wife? ",
            timestamp: "2024-12-15T05:46:44.807Z",
        },
        {
            username: "ashu.simgh",
            message: "Pretty good pretty good!",
            timestamp: "2024-12-15T05:47:03.723Z",
        },
        {
            username: "ashu.simgh",
            message: "Supp bro whatcha upto? ",
            timestamp: "2024-12-15T05:46:24.624Z",
        },
        {
            username: "2977770100",
            message: "All good man? How's your wife? ",
            timestamp: "2024-12-15T05:46:37.817Z",
        },
        {
            username: "ashu.simgh",
            message: "Pretty good pretty good!",
            timestamp: "2024-12-15T05:47:03.523Z",
        },
        {
            username: "ashu.simgh",
            message: "Supp bro whatcha upto? ",
            timestamp: "2024-12-15T05:46:34.524Z",
        },
        {
            username: "2977770100",
            message: "All good man? How's your wife? ",
            timestamp: "2024-12-15T05:46:47.307Z",
        },
        {
            username: "ashu.simgh",
            message: "Pretty good pretty good!",
            timestamp: "2024-11-15T05:47:03.743Z",
        },
        {
            username: "ashu.simgh",
            message: "Pretty good pretty good!",
            timestamp: "2024-12-15T01:57:03.743Z",
        },
        {
            username: "ashu.simgh",
            message: "Pretty good pretty good!",
            timestamp: "2024-12-15T15:41:03.743Z",
        },
    ]);
    const [roomID, setRoomID] = useState(null);

    useEffect(() => {
        const socketConnnetion = io(NEXT_PUBLIC_SERVER_URL);

        socketConnnetion.on("connect", () => {
            console.log("Connected to socket:", socketConnnetion.id);
        });

        socketConnnetion.on("disconnect", () => {
            console.log("Disconnected from socket");
        });

        socketConnnetion.on("connect_error", (err) => {
            console.error(`Connection error: ${err.message}`);
        });

        setSocket(socketConnnetion);

        socketConnnetion.on("partner_found", (data) => {
            setPartnerName(data.username);
            setRoomID(data.roomID);
            setIsSearching(false);
            setIsConnected(true);
            setMessages([]);
        });

        socketConnnetion.on("receive_message", (messageData) => {
            setMessages((prevMessages) => [...prevMessages, messageData]);
        });

        socketConnnetion.on("partner_disconnected", () => {
            setIsConnected(false);
            setRoomID(null);
            alert("Your partner has disconnected");
        });

        return () => {
            socketConnnetion.off("partner_found");
            socketConnnetion.off("receive_message");
            socketConnnetion.off("partner_disconnected");
        };
    }, []);

    const findPartner = (userdata: UserData) => {
        setIsSearching(true);
        socket.emit("find_partner", userdata);
    };

    const sendMessage = (message: string) => {
        if (message.trim() && roomID) {
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
            value={{ socket, findPartner, sendMessage, partnerName, messages, disconnectChat }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export function UserProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<UserData>({
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        avatar: "",
        age: null,
        tier: "",
        uuid: "",
    });
    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        setUUID(window);
        getAndSetUserData();
    }, []);

    const getAndSetUserData = async () => {
        try {
            await axios.get("/user").then((response) => {
                if (response?.data?.age === null) response.data.age = 0;
                setUserData((prev) => ({ ...prev, ...response.data }));
                setIsLoggedin(true);
            });
        } catch (error) {
            setIsLoggedin(false);
        }
    };

    const setUUID = async (window) => {
        const uuid = await generateUUID(window);
        setUserData((prev) => ({ ...prev, uuid }));
    };

    const setUserName = (username: String) => {
        if (username) setUserData((prev) => ({ ...prev, username }));
    };
    const setEmail = (email: String) => {
        if (email) setUserData((prev) => ({ ...prev, email }));
    };
    const setFirstName = (firstname: String) => {
        if (firstname) setUserData((prev) => ({ ...prev, firstname }));
    };
    const setLastName = (lastname: String) => {
        if (lastname) setUserData((prev) => ({ ...prev, lastname }));
    };

    console.log("Fetching user context");

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
                setUserName,
                setEmail,
                setFirstName,
                setLastName,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
