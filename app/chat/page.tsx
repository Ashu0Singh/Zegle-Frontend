import React from "react";
import "./chat.css";
import VideoChat from "@/components/VideoChat";
import TextChat from "@/components/TextChat";

const Chat = () => {
    return (
        <main className="chat">
            <VideoChat />
            <TextChat />
        </main>
    );
};

export default Chat;
