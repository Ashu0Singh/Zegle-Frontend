import type { Metadata } from "next";

export const meta: Metadata = {
    title: "Zegle: Ad-Free Platform to Interact with Strangers Online",
    description:
        "Zegle is a platform that is inspired by the idea of Omeagle, except is has better UI and works towards getting rid of ads",
};

export const SidebarRoutes = {
    routes: [
        {
            text: "Home",
            route: "/",
        },
        {
            text: "Video Chat",
            route: "/chat",
        },
        {
            text: "Friends",
            route: "/friends",
        },
    ],
};
