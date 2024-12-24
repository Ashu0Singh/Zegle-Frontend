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
}

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false); // For client-side rendering
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

    // if (!mounted) return null;

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
                    <Dialog>
                        <DialogTrigger asChild className="cursor-pointer">
                            <Menu />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] border-[1px]">
                            <DialogTitle className="text-center">
                                Menu
                            </DialogTitle>
                            <NavbarNavigation
                                theme={theme}
                                handleThemeChange={handleThemeChange}
                                mounted={mounted}
                                isLoggedin={isLoggedin}
                                firstname={firstname}
                            />
                        </DialogContent>
                    </Dialog>
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
        <div className="navbar-navigation ">
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
                        <div className="flex items-center space-x-2">
                            <Button
                                className={`navbar-navigation-buttons-themeSwitch items-center space-x-2 bg-transparent hover:bg-transparent border-[1px] ${
                                    props.theme === "light" && "text-foreground"
                                }`}
                                onClick={props.handleThemeChange}
                            >
                                {props.theme === "dark" ? <Moon /> : <Sun />}
                            </Button>
                            {props.isLoggedin && (
                                <Link
                                    href={"/user"}
                                    className={
                                        GeistMono.className +
                                        buttonVariants({ variant: "default" }) +
                                        " navbar-navigation-buttons-profile"
                                    }
                                >
                                    {props.firstname.charAt(0).toUpperCase()}
                                </Link>
                            )}
                        </div>
                    )}
                    {!props.isLoggedin && (
                        <Link
                            href="/user/login"
                            className={
                                buttonVariants({ variant: "default" }) +
                                " navbar-navigation-buttons-login"
                            }
                        >
                            Login
                        </Link>
                    )}
                    {!props.isLoggedin && (
                        <Link
                            href="/user/signup"
                            className={
                                buttonVariants({ variant: "default" }) +
                                " navbar-navigation-buttons-signup"
                            }
                        >
                            Sign Up
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};
