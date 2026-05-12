
"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
]

export default function Navbar() {

    const [activeIndex, setActiveIndex] = useState(0)

    // Logic to detect scrolling and update active index (Keep this)
    useEffect(() => {
        const handleScroll = () => {
            // Invisible line 1/3rd of the way down the screen to trigger section change
            const triggerLine = window.scrollY + window.innerHeight / 3;

            let currentIndex = 0;

            links.forEach((link, i) => {
                // Find section by ID
                const sectionId = link.href.substring(1);
                const element = document.getElementById(sectionId);

                if (element) {
                    const rect = element.getBoundingClientRect();
                    const absoluteTop = window.scrollY + rect.top;
                    if (absoluteTop <= triggerLine) {
                        currentIndex = i;
                    }
                }
            });

            setActiveIndex(currentIndex);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* --- DESKTOP NAVBAR --- */}
            <div className="hidden md:flex fixed top-6 w-full justify-center z-50 pointer-events-none">
                <nav
                    className="relative flex items-center gap-1 p-1.5 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.05)] pointer-events-auto"
                    style={{
                        background: "rgba(5, 10, 15, 0.4)",
                        border: "1px solid rgba(0, 229, 255, 0.15)",
                        backdropFilter: "blur(16px)",
                    }}
                >
                    {links.map((link, i) => {
                        const isActive = activeIndex === i;

                        return (
                            <Link
                                key={i}
                                href={link.href}
                                onClick={() => setActiveIndex(i)}
                                className="relative flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold uppercase transition-all duration-300 border"
                                style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    color: isActive ? "#00e5ff" : "rgba(255,255,255,0.45)",
                                    background: isActive ? "rgba(0, 229, 255, 0.15)" : "transparent",
                                    borderColor: isActive ? "rgba(0, 229, 255, 0.4)" : "transparent",
                                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200"
                                    style={{
                                        background: "#00e5ff",
                                        opacity: isActive ? 1 : 0,
                                        transform: isActive ? "scale(1)" : "scale(0)",
                                        boxShadow: isActive ? "0 0 8px #00e5ff" : "none"
                                    }}
                                />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* --- MOBILE NAVBAR --- */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 pointer-events-none">

                {/* Mobile Top Bar */}
                <div className="w-full flex items-center justify-between p-4 pointer-events-auto">
                    {/* Logo / HUD Identifier */}
                    <div className="flex items-center gap-2 border border-cyan-500/30 bg-[#050a0f]/80 backdrop-blur-md px-3 py-1.5 rounded shadow-[0_0_15px_rgba(0,229,255,0.05)]">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <span className="text-[10px] text-cyan-400 tracking-widest font-mono uppercase">
                            SYS_NAV // 0.1
                        </span>
                    </div>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="relative w-10 h-10 border border-cyan-500/30 bg-[#050a0f]/80 backdrop-blur-md flex flex-col items-center justify-center gap-[5px] rounded shadow-[0_0_15px_rgba(0,229,255,0.05)] z-60"
                    >
                        <span className={`block w-5 h-[2px] bg-cyan-400 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                        <span className={`block w-5 h-[2px] bg-cyan-400 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-5 h-[2px] bg-cyan-400 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 translate-y-[-7px]" : ""}`} />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-0 h-dvh bg-[#050a0f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-500 pointer-events-auto z-55
                        ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
                    `}
                >
                    {/* Decorative Elements inside Menu */}
                    <div className="absolute top-20 left-4 w-px h-1/2 bg-linear-to-b from-cyan-500/50 to-transparent" />
                    <div className="absolute top-20 right-4 w-px h-1/2 bg-linear-to-b from-cyan-500/50 to-transparent" />

                    <p className="text-cyan-500/50 text-xs tracking-[0.3em] font-mono mb-4 uppercase">
                        {">_ Navigation_Menu"}
                    </p>

                    {links.map((link, i) => {
                        const isActive = activeIndex === i;
                        return (
                            <Link
                                key={i}
                                href={link.href}
                                onClick={() => {
                                    setActiveIndex(i);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="relative flex items-center justify-center w-3/4 py-3.5 border text-sm font-bold uppercase transition-all duration-300"
                                style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    color: isActive ? "#050a0f" : "rgba(255,255,255,0.7)",
                                    background: isActive ? "#00e5ff" : "rgba(0, 229, 255, 0.03)",
                                    borderColor: isActive ? "#00e5ff" : "rgba(0, 229, 255, 0.2)",
                                    boxShadow: isActive ? "0 0 20px rgba(0, 229, 255, 0.4)" : "none"
                                }}
                            >
                                <span className="absolute left-4 opacity-50 font-mono text-[10px]">0{i + 1}</span>
                                {link.label}
                            </Link>
                        );
                    })}

                    <div className="mt-10 flex gap-3">
                        <div className="w-1.5 h-1.5 bg-cyan-500/50" />
                        <div className="w-1.5 h-1.5 bg-cyan-500/50" />
                        <div className="w-1.5 h-1.5 bg-cyan-500/50" />
                    </div>
                </div>
            </div>
        </>
    )
}