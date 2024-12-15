import { Socket } from "socket.io-client";

export interface SocketContextType {
    socket: Socket | null;
    partnerName: String | null;
    messages: Array<any>;
    messagesEndRef: React.RefObject<HTMLDivElement>;
    disconnectChat: (userdata: UserData) => void;
    findPartner: (userdata: UserData) => void;
    sendMessage: (message: string) => void;
}

export interface UserContextType {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    setUserName: (username: string) => void;
    setEmail: (email: string) => void;
    setFirstName: (firstname: string) => void;
    setLastName: (lastname: string) => void;
}

export interface UserData {
    username: String | undefined;
    email: String | undefined;
    firstname: String | undefined;
    lastname: String | undefined;
    avatar: String | undefined;
    age: Number | null;
    tier: String | undefined;
    uuid: String | undefined;
}

export interface TextChatProps {
    messagesEndRef: React.RefObject<HTMLDivElement>;
    userData: UserData;
    findPartner: (userdata: UserData) => void;
    username: String;
    socket: Socket | null;
    partnerName: String | null;
    messages: Array<any>;
    sendMessage: (message: string) => void;
}

export interface VideoChatProps {
    userData: UserData;
    socket: Socket | null;
    findPartner: (userdata: UserData) => void;
}
