"use client";

import {
    createContext,
    ReactNode,
    useState,
    useEffect,
    useContext,
} from "react";
import { io, Socket } from "socket.io-client";
import { NEXT_PUBLIC_SERVER_URL } from "@/config.js";

interface SocketContextType {
    getSocketConnection: () => Socket;
}

interface UserContextType {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    setUserName: (username: string) => void;
    setEmail: (email: string) => void;
    setFirstName: (firstname: string) => void;
    setLastName: (lastname: string) => void;
}

interface UserData {
    username: String | undefined;
    email: String | undefined;
    firstname: String | undefined;
    lastname: String | undefined;
    avatar: String | undefined;
    age: Number | null;
    tier: String | undefined;
}

export const SocketContext = createContext<SocketContextType | null>(null);
export const UserContext = createContext<UserContextType | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    console.log("Fetching socket context");

    const getSocketConnection = () => {
        if (socket && socket?.connected) return socket;
        const connection = io(NEXT_PUBLIC_SERVER_URL);

        connection.on("connect", () => {
            console.log("Connected to socket:", connection.id);
        });

        connection.on("disconnect", () => {
            console.log("Disconnected from socket");
        });

        connection.on("connect_error", (err) => {
            console.error(`Connection error: ${err.message}`);
        });

        setSocket(connection);
        return connection;
    };

    return (
        <SocketContext.Provider value={{ getSocketConnection }}>
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
    });

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
