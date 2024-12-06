"use client";
import "./user.css";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useUserContext } from "@/hooks/use-user";
import axios from "@/utils/axios";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { set, useForm, UseFormReturn } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import UserForm from "@/components/Form";
import { GeistMono } from "geist/font/mono";

const formSchema = z.object({
    firstname: z.string().trim().min(1, { message: "Firstname is required" }),
    lastname: z.string().trim(),
    username: z
        .string()
        .trim()
        .min(4, { message: "Username should be more than 4 characters" })
        .max(12, { message: "Username should be no more than 12 characters" }),
    email: z.string().trim().email({ message: "Enter a valid email" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password should be minimum 6 characters long" }),
    avatar: z.string(),
    age: z.preprocess(
        preprocessStringToNumber,
        z
            .number({
                invalid_type_error: "Invalid Age",
            })
            .int("Invalid Stock")
            .min(0, "Age must be positive"),
    ),
    tier: z.string(),
});

function preprocessStringToNumber(val: any) {
    if (!val) {
        return undefined;
    }

    if (typeof val === "string" && !isNaN(Number(val))) {
        return Number(val);
    }

    return val;
}

const User = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });
    const { reset } = form;
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (isEditing) {
            const response = await axios
                .put("/user", {
                    ...values,
                })
                .then((response) => response?.data)
                .catch((error) => {
                    toast({
                        title: error?.response?.data?.error,
                    });
                    return error.response;
                });
            await getUserData();
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const user = await axios
            .get("/user")
            .then((response) => {
                setIsLoading(false);
                if (response?.data?.age === null) response.data.age = 0;
                reset(response.data);
                return response.data;
            })
            .catch((error) => {
                error?.response?.data?.error &&
                    toast({ description: error?.response?.data?.error });
                router.push("/user/login");
            });
    };

    return (
        <section className="user">
            <UserForm FormTitle="User Profile" className="min-h-[400px]">
                {isLoading ? (
                    <div>Loading</div>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="user-display-form"
                        >
                            <div className="user-display-form-name">
                                <FormInputs
                                    form={form}
                                    label={"Firstname"}
                                    name={"firstname"}
                                    isEditing={isEditing}
                                />
                                <FormInputs
                                    form={form}
                                    label={"Lastname"}
                                    name={"lastname"}
                                    isEditing={isEditing}
                                />
                            </div>

                            <FormInputs
                                form={form}
                                diasbled={true}
                                label={"Username"}
                                name={"username"}
                                isEditing={isEditing}
                            />
                            <FormInputs
                                form={form}
                                diasbled={true}
                                label={"Email"}
                                name={"email"}
                                isEditing={isEditing}
                            />
                            <div className="user-display-form-last">
                                <FormInputs
                                    form={form}
                                    type="number"
                                    label={"Age"}
                                    name={"age"}
                                    isEditing={isEditing}
                                />
                                <FormInputs
                                    form={form}
                                    diasbled={true}
                                    label={"Tier"}
                                    name={"tier"}
                                    isEditing={isEditing}
                                />
                            </div>
                            <Button
                                type="submit"
                                className={`${GeistMono.className} sm:w-full`}
                                onClick={() => { onSubmit(form.getValues())}}
                            >
                                {isEditing ? "Save Profile" : "Edit Profile"}
                            </Button>
                        </form>
                    </Form>
                )}
            </UserForm>
        </section>
    );
};

function FormInputs({
    form,
    label,
    name,
    isEditing,
    type,
    diasbled,
}: {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    label: string;
    name:
        | "firstname"
        | "lastname"
        | "username"
        | "email"
        | "password"
        | "avatar"
        | "age"
        | "tier";
    isEditing: boolean;
    diasbled?: boolean;
    type?: string;
}) {
    return (
        <div>
            <Label className="user-display-form-label">{label}</Label>
            {isEditing ? (
                <FormField
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    disabled={diasbled || false}
                                    type={type || "text"}
                                    placeholder={label}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ) : (
                <p className="user-display-form-text border-[1px] p-1">
                    {form.getValues(name)}
                </p>
            )}
        </div>
    );
}

export default User;
