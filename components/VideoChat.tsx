import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

const VideoChat = () => {
    return (
        <section className="chat-video">
            <Card className="chat-video-window">
                <CardHeader>
                    <CardTitle>Chat window </CardTitle>
                </CardHeader>
            </Card>
            <Card className="chat-video-window">
                <CardHeader>
                    <CardTitle>Chat window </CardTitle>
                </CardHeader>
            </Card>
        </section>
    );
};

export default VideoChat;
