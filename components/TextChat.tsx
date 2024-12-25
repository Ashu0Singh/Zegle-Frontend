"use client";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { EllipsisVerticalIcon, SendHorizonal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TextChatProps } from "@/utils/types";

const TextChat = ({
    findPartner,
    socket,
    userData,
    partnerName,
    sendMessage,
    messages,
    username,
    messagesEndRef,
}: TextChatProps) => {
    const [message, setMessage] = useState("");

    const messageList = messages?.map((messageObject, index) => {
        return (
            <div
                ref={index === messages.length - 1 ? messagesEndRef : null}
                key={messageObject.timestamp}
                className={`${messageObject.username == username ? "ml-auto bg-gray-200 text-slate-800" : "mr-auto text-gray-200 bg-slate-900"} w-fit py-1 px-4 max-w-[80%] text-wrap rounded-lg`}
            >
                {messageObject.message}
            </div>
        );
    });

    useEffect(() => {
        if (messageList.length > 0)
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    const handleSendMessage = () => {
        if (partnerName === null) {
            findPartner(userData, socket);
        } else if (message.trim()) {
            sendMessage(message);
            setMessage("");
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <section className="chat-text">
            <Card className="chat-text-chatbox">
                <CardHeader className="chat-text-chatbox-header">
                    <CardTitle className="overflow-hidden">
                        {partnerName ? partnerName : "Finding a partner"}
                    </CardTitle>
                    {/* <EllipsisVerticalIcon /> */}
                </CardHeader>
                <CardContent className="chat-text-chatbox-chatbox pb-0">
                    <div className="flex flex-col gap-2 h-fit pt-2 mb-2">
                        {messageList}
                    </div>
                    <div ref={messagesEndRef} />
                </CardContent>
                <CardFooter className="chat-text-chatbox-footer">
                    <Input
                        className="border-0 flex-grow shadow-none"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message"
                    />
                    <Button
                        className="w-[50px] sm:w-[60px] sm:px-6"
                        onClick={handleSendMessage}
                    >
                        <SendHorizonal />
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
};

export default TextChat;
