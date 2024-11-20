import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";

import { meta } from "../data";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const AdelleSansRegular = localFont({
    src: "./fonts/adellesans-regular-webfont.woff",
    variable: "--font-adelle-sans-regular",
});
export const AdelleSansSemibold = localFont({
    src: "./fonts/adellesans-semibold-webfont.woff",
    variable: "--font-adelle-sans-semibold",
});
export const AdelleSansBold = localFont({
    src: "./fonts/adellesans-bold-webfont.woff",
    variable: "--font-adelle-sans-bold",
});
export const AdelleSansExtraBold = localFont({
    src: "./fonts/adellesans-extrabold-webfont.woff",
    variable: "--font-adelle-sans-extrabold",
});

export const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${AdelleSansRegular.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    forcedTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SidebarProvider>
                        <AppSidebar />
                        <main>
                            <SidebarTrigger />
                            {children}
                        </main>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
