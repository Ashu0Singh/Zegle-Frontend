"use client";

import {
    createContext,
    ReactNode,
    useState,
    useEffect,
    useContext,
} from "react";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "@/config";

interface ContextType {
    socket: Socket | null;
}

export const Context = createContext<ContextType | null>(null);

export const useSocket = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useSocket must be used within a UserContextProvider");
    }
    return context.socket;
};

export default function UserContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const connection = io("http://localhost:8080");

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

        return () => {
            connection.disconnect();
        };
    }, []);

    return <Context.Provider value={{ socket }}>{children}</Context.Provider>;
}
