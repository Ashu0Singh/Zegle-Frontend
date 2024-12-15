"use client";
import "./chat.css";
import VideoChat from "@/components/VideoChat";
import TextChat from "@/components/TextChat";
import { useContext } from "react";
import { SocketContext, UserContext } from "@/context/Context";

const Chat = () => {
    const { socket, sendMessage, findPartner, partnerName, messages } =
        useContext(SocketContext);
    const { userData } = useContext(UserContext);

    return (
        <main className="chat">
            <VideoChat
                findPartner={findPartner}
                socket={socket}
                userData={userData}
            />
            <TextChat
                username={userData.username ? userData.username : userData.uuid}
                socket={socket}
                sendMessage={sendMessage}
                partnerName={partnerName}
                messages={messages}
            />
        </main>
    );
};

export default Chat;
