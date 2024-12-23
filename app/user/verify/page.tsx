"use client";
import "../user.css";
import UserForm from "@/components/Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "@/utils/axios.js";
import { toast } from "@/hooks/use-toast";
import { GeistMono } from "geist/font/mono";

const page = () => {
    const searchQuery = useSearchParams();
    const token = searchQuery.get("token");
    const router = useRouter();
    const [email, setEmail] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios
            .post("/user/verify", { email, token })
            .then((response) => {
                if (response?.data?.message) {
                    toast({
                        title: "Success",
                        description: response?.data?.message,
                    });
                    router.push("/user");
                }
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: error?.response?.data?.error,
                });
            });
    };

    return (
        <section className="verify">
            <UserForm FormTitle="Verify">
                <form className="verify-form" onSubmit={onSubmit}>
                    <Input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        className={`${GeistMono.className} sm:w-full`}
                    >
                        Verify
                    </Button>
                </form>
            </UserForm>
        </section>
    );
};

export default page;
