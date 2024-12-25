import { Socket } from "socket.io-client";
import { UserData } from "@/utils/types";
import {
    closePeerConnection,
    getPeerConnection,
    getPeerConnectionOffer,
} from "@/utils/peer";
import { getRandomInt } from "./utils";

export const setupMediaStream = async (
    localVideoRef: React.RefObject<HTMLVideoElement>,
) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    } catch (error) {
        console.error("Media setup error:", error);
    }
};

export const handleIceCandidates = async (
    candidate: RTCIceCandidate,
    localVideoRef: React.RefObject<HTMLVideoElement>,
    remoteVideoRef: React.RefObject<HTMLVideoElement>,
    socket: Socket,
    roomID: string | null,
    setIsVideoConnected: (connected: boolean) => void,
) => {
    const peerConnection = await getPeerConnection(
        localVideoRef,
        remoteVideoRef,
        socket,
        roomID,
    );
    if (candidate) {
        try {
            await peerConnection.addIceCandidate(candidate);
            setIsVideoConnected(true);
        } catch (error) {
            console.error("Error adding ICE candidate:", error);
        }
    }
};

export const handlePartnerFound = async (
    data: { username: string; roomID: string; isInitiator: boolean },
    localVideoRef: React.RefObject<HTMLVideoElement>,
    remoteVideoRef: React.RefObject<HTMLVideoElement>,
    socket: Socket,
    setStates: {
        setPartnerName: (name: string | null) => void;
        setRoomID: (id: string | null) => void;
        setIsSearching: (searching: boolean) => void;
        setIsConnected: (connected: boolean) => void;
    },
) => {
    closePeerConnection(remoteVideoRef);
    setStates.setPartnerName(data.username);
    setStates.setRoomID(data.roomID);
    setStates.setIsSearching(false);
    setStates.setIsConnected(true);

    if (data.isInitiator) {
        const { offer } = await getPeerConnectionOffer(
            localVideoRef,
            remoteVideoRef,
            socket,
            data.roomID,
        );
        socket.emit("add_offer", { offer, roomID: data.roomID });
    }
};

export const disconnectChat = (
    userData: UserData,
    socket: Socket,
    setStates: {
        setIsConnected: (connected: boolean) => void;
        setIsVideoConnected: (connected: boolean) => void;
        setRoomID: (id: string | null) => void;
        setPartnerName: (name: string | null) => void;
        setMessages: React.Dispatch<React.SetStateAction<any[]>>;
    },
    remoteVideoRef: React.RefObject<HTMLVideoElement>,
    findPartner: (userData: UserData, socket: Socket) => void,
) => {
    remoteVideoRef.current.srcObject = null;
    setStates.setIsConnected(false);
    setStates.setIsVideoConnected(false);
    setStates.setRoomID(null);
    setStates.setPartnerName(null);
    setStates.setMessages([]);
    closePeerConnection(remoteVideoRef);
    setTimeout(() => findPartner(userData, socket), getRandomInt(1000));
};
