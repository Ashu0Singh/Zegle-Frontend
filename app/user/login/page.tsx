"use client";
import React from "react";
import UserForm from "@/components/Form";
import Link from "next/link";
import axios from "@/utils/axios.js";
import "../user.css";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { GeistMono } from "geist/font/mono";
import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z
        .string()
        .trim()
        .min(4, { message: "Username should be more than 4 characters" })
        .max(12, { message: "Username should be no more than 12 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password should be minimum 6 characters long" }),
});

const Login = () => {
    const { toast } = useToast();
    const { setEmail, setUserName, userData } = useUserContext();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await axios
            .post("/user/login", {
                ...values,
            })
            .then((response) => {
                response?.data?.username &&
                    setUserName(response?.data?.username);
                response?.data?.email && setEmail(response?.data?.email);
                router.push("/user");
            })
            .catch((error) => {
                console.log(error);
                toast({
                    title: error?.response?.data?.error,
                });
                return error.response;
            });
    }

    return (
        <section className="login">
            <UserForm FormTitle="Login">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="login-form"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className={`${GeistMono.className} sm:w-full`}
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
                <p className="login-toSignup">
                    Don't have an account?{" "}
                    <Link
                        className={`font-bold text-primary`}
                        href={"/user/signup"}
                    >
                        Sign Up
                    </Link>
                </p>
            </UserForm>
        </section>
    );
};

export default Login;
