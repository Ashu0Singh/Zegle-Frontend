import "./chat.css";
import { SocketProvider } from "@/context/SocketContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <SocketProvider>{children}</SocketProvider>;
}
