"use client";

import React, { useContext, useEffect } from "react";
import { Card, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { GeistMono } from "geist/font/mono";
import { VideoChatProps } from "@/utils/types";
import Loading from "./ui/loading";
import { toast } from "@/hooks/use-toast";
import { SocketContext } from "@/context/SocketContext";

const VideoChat = ({
    userData,

    isSearching,
    isConnected,
    isVideoConnected,

    socket,

    localVideoRef,
    remoteVideoRef,

    stopChatting,
    findPartner,
}: VideoChatProps) => {
    return (
        <section className="chat-video">
            <Card className="chat-video-window">
                <RemoteVideo
                    isSearching={isSearching}
                    isConnected={isConnected}
                    isVideoConnected={isVideoConnected}
                    remoteVideoRef={remoteVideoRef}
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
                        className="chat-video-window-incoming-button bg-red-600 hover:bg-red-500 active:bg-red-800 px-6 opacity-70"
                        onClick={stopChatting}
                    >
                        Stop
                    </Button>
                    <Button
                        className="chat-video-window-incoming-button bg-green-600 hover:bg-green-500 active:bg-green-800 px-6 opacity-70"
                        onClick={() => findPartner(userData, socket)}
                    >
                        Next
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
};

const RemoteVideo = ({
    isSearching,
    isConnected,
    isVideoConnected,
    remoteVideoRef,
}: {
    isSearching: boolean;
    isConnected: boolean;
    isVideoConnected: boolean;
    remoteVideoRef: React.RefObject<HTMLVideoElement>;
}) => {
    return (
        <div className="relative h-full">
            {/* Always render the video element */}
            <video
                ref={remoteVideoRef}
                className="video h-full mx-auto"
                autoPlay
            />

            {/* Overlay for Loading or Status Messages */}
            {isSearching && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <Loading message="Finding a partner..." />
                </div>
            )}
            {!isSearching && isConnected && !isVideoConnected && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <Loading message="Connecting video..." />
                </div>
            )}
        </div>
    );
};

export default VideoChat;
