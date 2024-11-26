"use client";
import React from "react";
import { Card, CardFooter } from "./ui/card";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { GeistMono } from "geist/font/mono";
import { SkipForward, X } from "lucide-react";

const VideoChat = () => {
    return (
        <section className="chat-video">
            <Card className="chat-video-window">
                <Webcam />
                <CardFooter
                    className={`chat-video-window-incoming ${GeistMono.className}`}
                >
                    <Button className="chat-video-window-incoming-button px-8">
                        <X />
                    </Button>
                    <Button className="chat-video-window-incoming-button px-8">
                        <SkipForward />
                    </Button>
                </CardFooter>
            </Card>
            <Card className="chat-video-window">
                <Webcam />
            </Card>
        </section>
    );
};

export default VideoChat;
