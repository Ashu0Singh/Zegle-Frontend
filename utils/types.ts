import { Socket } from "socket.io-client";

export interface SocketContextType {
    socket: Socket | null;
    partnerName: string | null;
    messages: Array<any>;
    messagesEndRef: React.RefObject<HTMLDivElement>;
    roomID: string | null;
    isConnected: boolean;
    isSearching: boolean;
    isVideoConnected: boolean;

    localVideoRef: React.RefObject<HTMLVideoElement>;

    remoteVideoRef: React.RefObject<HTMLVideoElement>;

    findPartner: (userData: UserData, socketConnection: Socket) => void;
    disconnectChat: (
        userData: UserData,
        socketConnection: Socket,
        {
            setIsConnected,
            setIsVideoConnected,
            setRoomID,
            setPartnerName,
        }: {
            setIsConnected: (connected: boolean) => void;
            setIsVideoConnected: (connected: boolean) => void;
            setRoomID: (id: string | null) => void;
            setPartnerName: (name: string | null) => void;
        },
        remoteVideoRef: React.RefObject<HTMLVideoElement>,
        findPartner: (userData: UserData, socketConnection: Socket) => void,
    ) => void;
    stopChatting: () => void;
    sendMessage: (message: string) => void;
}

export interface UserContextType {
    userData: UserData;
    isLoggedin: boolean;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    setUserName: (username: string) => void;
    setEmail: (email: string) => void;
    setFirstName: (firstname: string) => void;
    setLastName: (lastname: string) => void;
}

export interface UserData {
    username: string | undefined;
    email: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    avatar: string | undefined;
    age: Number | null;
    tier: string | undefined;
    uuid: string | undefined;
    verified: Boolean;
}

export interface TextChatProps {
    messagesEndRef: React.RefObject<HTMLDivElement>;
    socket: Socket | null;
    userData: UserData;
    findPartner: (userData: UserData, socketConnection: Socket) => void;
    username: string;
    partnerName: string | null;
    messages: Array<any>;
    sendMessage: (message: string) => void;
}

export interface VideoChatProps {
    userData: UserData;
    roomID: string | null;
    localVideoRef: React.RefObject<HTMLVideoElement>;
    socket: Socket | null;

    isConnected: boolean;

    remoteVideoRef: React.RefObject<HTMLVideoElement>;
    stopChatting: () => void;
    findPartner: (userData: UserData, socketConnection: Socket) => void;
}
