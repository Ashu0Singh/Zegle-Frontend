"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavbarRoutes } from "@/data";
import { GeistMono } from "geist/font/mono";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, MoonIcon, Sun } from "lucide-react";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false); // For client-side rendering

    // Ensure the component renders on the client only
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = () => {
        const body = document.body;
        body.classList.add("theme-transition");

        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        setTimeout(() => {
            body.classList.remove("theme-transition");
        }, 1000);
    };

    if (!mounted) return null;

    return (
        <nav className="navbar">
            <div className="navbar-zegle">
                <Link href="/">
                    <h1 className={`${GeistMono.className} zegle-header`}>
                        Zegle
                    </h1>
                </Link>
            </div>
            <div className="navbar-navigation">
                <ul className="navbar-navigation-routes">
                    {NavbarRoutes.routes.map((route, index) => (
                        <li
                            key={index}
                            className="navbar-navigation-routes-link"
                        >
                            <Link href={route.route}>{route.text}</Link>
                        </li>
                    ))}
                </ul>
                <div
                    className={`${GeistMono.className} navbar-navigation-buttons`}
                >
                    <Button
                        className={`flex items-center space-x-2 bg-transparent hover:bg-transparent border-[1px] ${theme === "light" && "text-foreground"}`}
                        onClick={handleThemeChange}
                    >
                        {theme === "dark" ? <MoonIcon /> : <Sun />}
                    </Button>
                    <Link
                        href="/login"
                        className={buttonVariants({ variant: "default" })}
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className={buttonVariants({ variant: "default" })}
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}
