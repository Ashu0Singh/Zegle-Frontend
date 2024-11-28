import "./chat.css";
import { SocketProvider } from "@/context/Context";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <SocketProvider>{children}</SocketProvider>;
}
