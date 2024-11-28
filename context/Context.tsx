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
    socket: Socket | null;
}

interface UserContextType {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

interface UserData {
    username: String | undefined;
    email: String | undefined;
    firstname: String | undefined;
    lastname: String | undefined;
    avatar: String | undefined;
}

export const SocketContext = createContext<SocketContextType | null>(null);
export const UserContext = createContext<UserContextType | null>(null);
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a UserContextProvider");
    }
    return context.socket;
};

export function SocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    console.log("Fetching socket context");

    // useEffect(() => {
    //     const connection = io("http://localhost:8080");

    //     connection.on("connect", () => {
    //         console.log("Connected to socket:", connection.id);
    //     });

    //     connection.on("disconnect", () => {
    //         console.log("Disconnected from socket");
    //     });

    //     connection.on("connect_error", (err) => {
    //         console.error(`Connection error: ${err.message}`);
    //     });

    //     setSocket(connection);

    //     return () => {
    //         connection.disconnect();
    //     };
    // }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}

export function UserProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<UserData | null>({
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        avatar: "",
    });
    console.log("Fetching user context");

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}
