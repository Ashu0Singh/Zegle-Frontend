"use client";
import { generateUUID } from "@/utils/generateUUID.js";
import axios from "@/utils/axios.js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { UserContextType, UserData } from "@/utils/types";

export const UserContext = createContext<UserContextType | null>(null);

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
        verified: false,
    });
    const [isLoggedin, setIsLoggedin] = useState<boolean | undefined>();

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

    const setUserName = (username: string) => {
        if (username) setUserData((prev) => ({ ...prev, username }));
    };
    const setEmail = (email: string) => {
        if (email) setUserData((prev) => ({ ...prev, email }));
    };
    const setFirstName = (firstname: string) => {
        if (firstname) setUserData((prev) => ({ ...prev, firstname }));
    };
    const setLastName = (lastname: string) => {
        if (lastname) setUserData((prev) => ({ ...prev, lastname }));
    };

    return (
        <UserContext.Provider
            value={{
                userData,
                isLoggedin,
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
