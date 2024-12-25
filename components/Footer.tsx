"use client";
import Image from "next/image";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { NavbarRoutes } from "@/data";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import axios from "@/utils/axios";

const Footer = () => {
    const [feedback, setFeedback] = React.useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFeedback((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = async () => {
        if (
            feedback.name === "" ||
            feedback.email === "" ||
            feedback.message === ""
        ) {
            toast({
                title: "Error",
                description: "Please fill in all fields",
            });
            return;
        }
        await axios
            .post("/feedback", { feedback })
            .then((response) => {
                setFeedback({
                    name: "",
                    email: "",
                    message: "",
                });
                toast({ description: response.data.message });
            })
            .catch((error) =>
                toast({ description: error?.response.data.message }),
            );
    };

    return (
        <div className="bg-black w-full h-fit text-white ">
            <div className=" flex sm:flex-row flex-col p-10 gap-5 sm:gap-10">
                <div className="flex flex-col gap-5">
                    <Image
                        src="https://raw.githubusercontent.com/Ashu0Singh/Assets/refs/heads/main/zegle-logo.png"
                        alt="Zegle Logo"
                        width={100}
                        height={100}
                    />
                    <p className="text-sm sm:text-base text-gray-500 tracking-wide">
                        Hi there! Thanks for visiting Zegle. If you encounter
                        any issues or have suggestions to improve the
                        experience, I’d love to hear from you. Have a great day!
                        Cheers!
                    </p>
                </div>
                <div
                    className={`${GeistSans.className} flex flex-col gap-2 w-full text-sm sm:text-base`}
                >
                    <h2 className="font-semibold text-gray-100">Navigation</h2>
                    {NavbarRoutes.routes.map((route, index) => (
                        <Link
                            href={route.route}
                            key={index}
                            className="text-gray-400 w-fit tracking-wide text-sm sm:text-base"
                        >
                            {route.text}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col gap-3 w-full text-sm sm:text-base">
                    <h2 className="font-semibold text-gray-100">Feedback</h2>
                    <Input
                        className="max-w-[300px] text-sm sm:text-base"
                        placeholder="Name"
                        value={feedback.name}
                        name="name"
                        onChange={handleChange}
                    />
                    <Input
                        className="max-w-[300px] text-sm sm:text-base"
                        placeholder="Email"
                        value={feedback.email}
                        name="email"
                        onChange={handleChange}
                    />
                    <Textarea
                        className="max-w-[300px] resize-none text-sm sm:text-base"
                        placeholder="Message"
                        value={feedback.message}
                        name="message"
                        onChange={handleChange}
                    />
                    <button
                        className="bg-white text-black p-2 rounded-md max-w-[300px]"
                        onClick={onSubmit}
                    >
                        Send
                    </button>
                </div>
            </div>
            <div className="border-t-[1px] border-gray-700/40 p-2 text-wide">
                <p className="text-sm sm:text-base text-gray-500 text-center">
                    For support, feedback, or inquiries, please email{" "}
                    <Link
                        href="mailto:support@zegle.in"
                        className="text-gray-100"
                    >
                        support@zegle.in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Footer;
