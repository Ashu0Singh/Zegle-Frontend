import type { Metadata } from "next";

export const meta: Metadata = {
    title: "Zegle - Ad-Free Anonymous Video Chat | Better Alternative to Omegle",
    description:
        "Experience instant, ad-free video chat with a sleek UI. No sign-ups, no ads—just anonymous conversations. Chat better with Zegle",
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
