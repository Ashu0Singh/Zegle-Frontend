import "./globals.css";
import type { Metadata } from "next";

import { meta } from "../data";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { GeistSans } from "geist/font/sans";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";
import { SocketProvider } from "@/context/SocketContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
            <body className={`${GeistSans.className} antialiased`}>
                <UserProvider>
                    <SocketProvider>
                        <ThemeProvider
                            attribute="class"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Navbar />
                            <main className="h-full">{children}</main>
                            <Toaster />
                        </ThemeProvider>
                    </SocketProvider>
                </UserProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
