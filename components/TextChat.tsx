import React from "react";
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

const TextChat = () => {
    return (
        <section className="chat-text">
            <Card className="chat-text-chatbox">
                <CardHeader className="chat-text-chatbox-header">
                    <CardTitle>ashu.simgh</CardTitle>
                    <EllipsisVerticalIcon />
                </CardHeader>
                <CardContent className="chat-text-chatbox-chatbox">
                    Chatbox
                </CardContent>
                <CardFooter className="chat-text-chatbox-footer">
                    <Input className="border-0 flex-grow shadow-none"></Input>
                    <Button className="w-[50px] sm:w-[60px] sm:px-6">
                        <SendHorizonal />
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
};

export default TextChat;
