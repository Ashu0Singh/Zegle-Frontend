import type { Metadata } from "next";

export const meta: Metadata = {
    title: "Zegle: Omegle but Ad-Free",
    description:
        "Zegle is a platform that is inspired by the idea of Omegle, except is has better UI and works towards getting rid of ads",
};

export const NavbarRoutes = {
    routes: [
        {
            text: "Home",
            route: "/",
        },
        {
            text: "Chat",
            route: "/chat",
        },
        // {
        //     text: "Pricing",
        //     route: "/pricing",
        // },
    ],
};
