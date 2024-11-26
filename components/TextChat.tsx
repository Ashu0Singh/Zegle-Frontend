import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { EllipsisVerticalIcon } from "lucide-react";

const TextChat = () => {
    return (
        <section className="chat-text">
            <Card className="chat-text-chatbox">
                <CardHeader className="chat-text-chatbox-header">
                    <CardTitle>ashu.simgh</CardTitle>
                    <EllipsisVerticalIcon/>
                </CardHeader>
                <CardContent>Chatbox</CardContent>
            </Card>
        </section>
    );
};

export default TextChat;
