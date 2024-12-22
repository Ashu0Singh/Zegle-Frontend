"use client";
import React from "react";
import { Card, CardFooter } from "./ui/card";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { GeistMono } from "geist/font/mono";
import { VideoChatProps } from "@/utils/types";

const VideoChat = ({
    userData,
    localVideoRef,
    remoteVideoRef,
    socket,
    isConnected,
    stopChatting,
    findPartner,
}: VideoChatProps) => {
    return (
        <section className="chat-video">
            <Card className="chat-video-window">
                <video
                    ref={remoteVideoRef}
                    className="video h-full mx-auto"
                    muted
                    autoPlay
                />
            </Card>
            <Card className="chat-video-window">
                <video
                    className="video h-full mx-auto"
                    autoPlay
                    muted
                    ref={localVideoRef}
                />
                <CardFooter
                    className={`chat-video-window-buttons ${GeistMono.className}`}
                >
                    <Button
                        className="chat-video-window-incoming-button bg-red-600 px-6 opacity-70"
                        onClick={stopChatting}
                    >
                        Stop
                    </Button>
                    <Button
                        className="chat-video-window-incoming-button bg-green-600 px-6 opacity-70"
                        onClick={() => findPartner(userData, socket)}
                    >
                        Next
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
};

export default VideoChat;
