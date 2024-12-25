import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="home">
            <section className="home-hero h-[92dvh] content-center">
                <div className="home-hero-content max-w-[800px] mx-auto flex flex-col gap-5 sm:gap-10 text-center text-wrap p-5">
                    <h1
                        className={`${GeistSans.className} text-2xl sm:text-5xl font-extrabold tracking-tight text-wrap`}
                    >
                        Minimal, Functional Connection Roulette inspired by
                        Omegle
                    </h1>
                    <p
                        className={`${GeistSans.className} text-sm sm:text-lg text-gray-500 tracking-wide p-2 sm:p-4`}
                    >
                        Tired of cluttered interfaces, intrusive ads, and poor
                        user experiences? I created Zegle—a next-gen platform
                        for seamless, anonymous connections. With a clean,
                        ad-free design, it reimagines online chatting to focus
                        on meaningful conversations and exploration without
                        distractions.
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
}
