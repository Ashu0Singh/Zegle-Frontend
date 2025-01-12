"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { NavbarRoutes } from "@/data";
import { GeistMono } from "geist/font/mono";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";
import { SocketContext } from "@/context/SocketContext";
import { useUserContext } from "@/hooks/use-user";

interface NavbarNavigationProps {
    theme: string | undefined;
    handleThemeChange: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => void;
    mounted: boolean | undefined;
    isLoggedin: boolean;
    firstname: string;
    classname?: string;
}

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const isMobile = useIsMobile();
    const {
        isLoggedin,
        userData: { firstname },
    } = useUserContext();

    const pathName = usePathname();
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        if (pathName !== "/chat") {
            socket?.disconnect();
        }
        setMounted(true);
    }, [pathName]);

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

    return (
        <nav className="navbar">
            <div className="navbar-zegle">
                <Link href="/">
                    <h1 className={`${GeistMono.className} zegle-header`}>
                        Zegle
                    </h1>
                </Link>
            </div>
            {typeof isMobile !== "undefined" &&
                (isMobile ? (
                    <MobileNavbar
                        theme={theme}
                        handleThemeChange={handleThemeChange}
                        mounted={mounted}
                        isLoggedin={isLoggedin}
                        firstname={firstname}
                    />
                ) : (
                    <NavbarNavigation
                        theme={theme}
                        handleThemeChange={handleThemeChange}
                        mounted={mounted}
                        isLoggedin={isLoggedin}
                        firstname={firstname}
                    />
                ))}
        </nav>
    );
}

const NavbarNavigation: React.FC<NavbarNavigationProps> = (props) => {
    return (
        <div className={`navbar-navigation ${props?.classname}`}>
            <ul className="navbar-navigation-routes">
                {NavbarRoutes.routes.map((route, index) => (
                    <li key={index} className="navbar-navigation-routes-link">
                        <Link href={route.route}>{route.text}</Link>
                    </li>
                ))}
            </ul>
            {typeof props.isLoggedin !== "undefined" && (
                <div
                    className={`${GeistMono.className} navbar-navigation-buttons`}
                >
                    {props.mounted && (
                        <Button
                            className={`navbar-navigation-buttons-themeSwitch ${
                                props.theme === "light" && "text-foreground"
                            }`}
                            onClick={props.handleThemeChange}
                        >
                            {props.theme === "dark" ? <Moon /> : <Sun />}
                        </Button>
                    )}
                    {props.isLoggedin && (
                        <Link
                            href={"/user"}
                            className={
                                GeistMono.className +
                                buttonVariants({ variant: "outline" })
                            }
                        >
                            {props.firstname.charAt(0).toUpperCase()}
                        </Link>
                    )}
                    {!props.isLoggedin && (
                        <Link
                            href="/user/login"
                            className={buttonVariants({ variant: "default" })}
                        >
                            Login
                        </Link>
                    )}
                    {!props.isLoggedin && (
                        <Link
                            href="/user/signup"
                            className={buttonVariants({ variant: "default" })}
                        >
                            Sign Up
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

const MobileNavbar: React.FC<NavbarNavigationProps> = ({
    theme,
    handleThemeChange,
    mounted,
    isLoggedin,
    firstname,
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
                <Menu />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-[1px] gap-4">
                <DialogTitle className="text-left text-3xl text-gray-500 sr-only">
                    Navigation
                </DialogTitle>
                {NavbarRoutes.routes.map((route, index) => (
                    <Link
                        key={index}
                        className="navbar-mobile-navigation-text"
                        href={route.route}
                    >
                        {route.text}
                    </Link>
                ))}
                {!isLoggedin && (
                    <Link
                        href="/user/login"
                        className={"navbar-mobile-navigation-text"}
                    >
                        Login
                    </Link>
                )}
                {!isLoggedin && (
                    <Link
                        href="/user/signup"
                        className={"navbar-mobile-navigation-text"}
                    >
                        Sign Up
                    </Link>
                )}
                {isLoggedin && (
                    <Link
                        href={"/user"}
                        className={"navbar-mobile-navigation-text"}
                    >
                        Account
                    </Link>
                )}
                {mounted && (
                    <Button
                        className={`navbar-mobile-navigation-text p-6`}
                        onClick={handleThemeChange}
                    >
                        {theme === "dark" ? "Dark Mode" : "Light Mode"}
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
};
