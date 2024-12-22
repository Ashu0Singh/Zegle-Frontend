"use client";
import "./chat.css";
import VideoChat from "@/components/VideoChat";
import TextChat from "@/components/TextChat";
import { useContext, useEffect } from "react";
import { SocketContext } from "@/context/SocketContext";
import { useUserContext } from "@/hooks/use-user";

const Chat = () => {
    const {
        partnerName,
        messages,
        roomID,
        isConnected,
        stopChatting,
        messagesEndRef,
        localVideoRef,
        remoteVideoRef,

        socket,

        sendMessage,
        findPartner,
    } = useContext(SocketContext);
    const { userData } = useUserContext();

    return (
        <main className="chat">
            <VideoChat
                socket={socket}
                roomID={roomID}
                localVideoRef={localVideoRef}
                remoteVideoRef={remoteVideoRef}
                findPartner={findPartner}
                userData={userData}
                stopChatting={stopChatting}
                isConnected={isConnected}
            />
            <TextChat
                messagesEndRef={messagesEndRef}
                socket={socket}
                findPartner={findPartner}
                userData={userData}
                username={userData.username ? userData.username : userData.uuid}
                sendMessage={sendMessage}
                partnerName={partnerName}
                messages={messages}
            />
        </main>
    );
};

export default Chat;
