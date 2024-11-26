import "./globals.css";
import type { Metadata } from "next";

import { meta } from "../data";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { GeistSans } from "geist/font/sans";
import ContextProvider from "@/context/Context";

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
                <ContextProvider>
                    <ThemeProvider
                        attribute="class"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        <main className="h-full">{children}</main>
                    </ThemeProvider>
                </ContextProvider>
            </body>
        </html>
    );
}
