"use client";
import UserForm from "@/components/Form";
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
import Link from "next/link";
import axios from "@/utils/axios";
import { useUserContext } from "@/hooks/use-user";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

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
});

const Signup = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            firstname: "",
            lastname: "",
            password: "",
            email: "",
        },
    });

    const router = useRouter();
    const { toast } = useToast();
    const { setEmail, setUserName } = useUserContext();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await axios
            .put("/user/signup", {
                ...values,
            })
            .then((response) => {
                response?.data?.username &&
                    setUserName(response?.data?.username);
                response?.data?.email && setEmail(response?.data?.email);
                router.push("/user");
            })
            .catch((error) => {
                toast({
                    title: error?.response?.data?.error,
                });
                return error.response;
            });
    }

    return (
        <section className="signup">
            <UserForm FormTitle="Sign Up">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="signup-form"
                    >
                        <div className="signup-form-name">
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Firstname"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Lastname"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
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
                <p className="signup-toLogin">
                    Alredy have an account?{" "}
                    <Link
                        className={`font-bold text-primary`}
                        href={"/user/login"}
                    >
                        Login
                    </Link>
                </p>
            </UserForm>
        </section>
    );
};

export default Signup;
