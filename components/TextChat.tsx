"use client";
import { useState, KeyboardEvent } from "react";
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
    partnerName,
    sendMessage,
    messages,
    username,
}: TextChatProps) => {
    const [message, setMessage] = useState("");

    const messageList = messages.map((messageObject) => {
        return (
            <div
                key={messageObject.timestamp}
                className={`${messageObject.username == username ? "ml-auto" : "mr-auto"} text-primary w-fit p-2 bg-gray-200 rounded-lg`}
            >
                {messageObject.message}
            </div>
        );
    });

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage("");
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
                    <CardTitle>
                        {partnerName ? partnerName : "Finding a partner"}
                    </CardTitle>
                    <EllipsisVerticalIcon />
                </CardHeader>
                <CardContent className="chat-text-chatbox-chatbox pb-0">
                    <div className="flex flex-col gap-2 h-full pt-2 pb-2">
                        {messageList}
                    </div>
                </CardContent>
                <CardFooter className="chat-text-chatbox-footer">
                    <Input
                        className="border-0 flex-grow shadow-none"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
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
