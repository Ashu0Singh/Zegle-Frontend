import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { GeistSans } from "geist/font/sans";

export default function NotFound() {
    return (
        <div className="min-h-[92dvh] flex items-center justify-center px-4 py-12">
            <div className="max-w-[600px] w-full text-center flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1
                        className={`${GeistSans.className} text-6xl sm:text-7xl font-extrabold tracking-tight`}
                    >
                        404
                    </h1>
                    <p
                        className={`${GeistSans.className} text-2xl sm:text-3xl font-bold tracking-tight`}
                    >
                        Page Not Found
                    </p>
                </div>

                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Link href="/" className={buttonVariants()}>
                        Go Home
                    </Link>
                    <Link
                        href="/chat"
                        className={buttonVariants({ variant: "outline" })}
                    >
                        Start Chatting
                    </Link>
                </div>
            </div>
        </div>
    );
}
