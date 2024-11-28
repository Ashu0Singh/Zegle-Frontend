import "./globals.css";
import type { Metadata } from "next";

import { meta } from "../data";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { GeistSans } from "geist/font/sans";
import { UserProvider } from "@/context/Context";
import { Toaster } from "@/components/ui/toaster";

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
                    <ThemeProvider
                        attribute="class"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        <main className="h-full">{children}</main>
                        <Toaster />
                    </ThemeProvider>
                </UserProvider>
            </body>
        </html>
    );
}
