"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavbarRoutes } from "@/data";
import { GeistMono } from "geist/font/mono";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface NavbarNavigationProps {
    theme: string | undefined;
    handleThemeChange: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => void;
}

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false); // For client-side rendering
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const handleResize = () => setIsMobile(window.innerWidth <= 640);

            handleResize();
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const handleThemeChange = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
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
            {isMobile ? (
                // <Drawer>
                //     <DrawerTrigger>
                //         <Menu />
                //     </DrawerTrigger>
                //     <DrawerContent>
                //         <DrawerHeader>
                //             <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                //             <DrawerDescription>
                //                 This action cannot be undone.
                //             </DrawerDescription>
                //         </DrawerHeader>
                //         <DrawerFooter>
                //             <Button>Submit</Button>
                //             <DrawerClose>
                //                 <Button variant="outline">Cancel</Button>
                //             </DrawerClose>
                //         </DrawerFooter>
                //     </DrawerContent>
                // </Drawer>
                <Dialog>
                    <DialogTrigger asChild className="cursor-pointer">
                        <Menu />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogTitle className="text-center">Menu</DialogTitle>
                        <NavbarNavigation
                            theme={theme}
                            handleThemeChange={handleThemeChange}
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <NavbarNavigation
                    theme={theme}
                    handleThemeChange={handleThemeChange}
                />
            )}
        </nav>
    );
}


const NavbarNavigation: React.FC<NavbarNavigationProps> = (props) => {
    return (
        <div className="navbar-navigation">
            <ul className="navbar-navigation-routes">
                {NavbarRoutes.routes.map((route, index) => (
                    <li key={index} className="navbar-navigation-routes-link">
                        <Link href={route.route}>{route.text}</Link>
                    </li>
                ))}
            </ul>
            <div className={`${GeistMono.className} navbar-navigation-buttons`}>
                <Button
                    className={`flex items-center space-x-2 bg-transparent hover:bg-transparent border-[1px] ${
                        props.theme === "light" && "text-foreground"
                    }`}
                    onClick={props.handleThemeChange}
                >
                    {props.theme === "dark" ? <Moon /> : <Sun />}
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
    );
};
