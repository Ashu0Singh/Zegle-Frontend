"use client";
import "./chat.css";
import VideoChat from "@/components/VideoChat";
import TextChat from "@/components/TextChat";
import { useContext } from "react";
import { SocketContext } from "@/context/SocketContext";
import { useUserContext } from "@/hooks/use-user";

const Chat = () => {
    const {
        partnerName,
        messages,
        roomID,
        isConnected,
        isSearching,
        isVideoConnected,

        messagesEndRef,
        localVideoRef,
        remoteVideoRef,
        
        socket,
        
        stopChatting,
        sendMessage,
        findPartner,
    } = useContext(SocketContext);
    const { userData } = useUserContext();

    return (
        <main className="chat">
            <VideoChat
                userData={userData}

                isSearching={isSearching}
                isConnected={isConnected}
                isVideoConnected={isVideoConnected}

                socket={socket}
                roomID={roomID}

                localVideoRef={localVideoRef}
                remoteVideoRef={remoteVideoRef}

                findPartner={findPartner}
                stopChatting={stopChatting}
            />
            <TextChat
                username={userData.username ? userData.username : userData.uuid}
                userData={userData}
                partnerName={partnerName}
                
                isConnected={isConnected}
                isSearching={isSearching}

                socket={socket}

                messagesEndRef={messagesEndRef}
                messages={messages}

                findPartner={findPartner}
                sendMessage={sendMessage}
            />
        </main>
    );
};

export default Chat;
