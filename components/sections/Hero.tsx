"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ROLES = [
    "Full-Stack Developer",
    "ML Enthusiast",
    "UI/UX Designer",
    "Problem Solver",
];

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const typeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let ri = 0, ci = 0, deleting = false;
        let timer: ReturnType<typeof setTimeout>;

        function type() {
            const el = typeRef.current;
            if (!el) return;
            const current = ROLES[ri];
            if (!deleting) {
                el.textContent = current.slice(0, ci + 1);
                ci++;
                if (ci === current.length) {
                    deleting = true;
                    timer = setTimeout(type, 1800);
                    return;
                }
                timer = setTimeout(type, 80);
            } else {
                el.textContent = current.slice(0, ci - 1);
                ci--;
                if (ci === 0) {
                    deleting = false;
                    ri = (ri + 1) % ROLES.length;
                    timer = setTimeout(type, 300);
                    return;
                }
                timer = setTimeout(type, 40);
            }
        }
        type();
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-text-anim", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.15, // Animates each element one after the other
                delay: 0.2
            });

            gsap.from(".hero-img-anim", {
                scale: 0.9,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                delay: 0.5
            });
        }, heroRef); // Scopes the animation to the Hero section

        return () => ctx.revert();
    })

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative min-h-screen w-full flex items-center justify-center"
        >

            {/* ── Content Grid ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                <div
                    className="absolute -z-10 opacity-10 md:opacity-10 -left-80"
                    style={{
                        animation: "spin 20s linear infinite reverse",
                    }}
                >
                    <Image
                        src="/cyberCircle.png"
                        alt="Cyber Circle"
                        width={600}
                        height={600}
                    />
                </div>

                {/* LEFT: Text */}
                <div className="flex flex-col gap-3">

                    <div className="flex items-center gap-2 border border-cyan-600 px-3 py-1 rounded-full w-fit hero-text-anim">

                        <div className="relative flex items-center justify-center w-3 h-3">
                            <div className="absolute w-3 h-3 bg-cyan-500 rounded-full animate-ping" />
                            <div className="absolute w-2 h-2 bg-cyan-500 rounded-full " />
                        </div>
                        <p
                            className="text-xs font-medium text-cyan-500 "
                            style={{ fontFamily: "'Share Tech Mono', monospace" }}
                        >
                            Available for work
                        </p>
                    </div>

                    <h1
                        className="text-3xl md:text-[58px] font-bold tracking-wider text-[#ddeeff] uppercase leading-[1.05] hero-text-anim"
                        style={{ fontFamily: "'Michroma', sans-serif" }}
                    >
                        Niwantha{" "}
                        <span className="text-cyan-400">Sanjula</span>
                    </h1>

                    {/* Typing effect */}
                    <div className="flex items-center gap-1.5 md:gap-2 h-8 md:h-7 hero-text-anim whitespace-nowrap">
                        <span
                            className="text-cyan-500/60 text-base md:text-[24px] tracking-widest"
                            style={{ fontFamily: "'Share Tech Mono', monospace" }}
                        >
                            &gt;_
                        </span>
                        <span
                            ref={typeRef}
                            className="text-cyan-400 text-base md:text-[24px] tracking-wider"
                            style={{ fontFamily: "'Share Tech Mono', monospace" }}
                        />
                        <span
                            className="inline-block w-[2px] h-[16px] md:h-[20px] bg-cyan-400 ml-0.5"
                            style={{ animation: "blink 0.8s step-end infinite" }}
                        />
                    </div>

                    <p
                        className="text-[12px] leading-relaxed tracking-wider text-cyan-200/40 max-w-sm mt-1 hero-text-anim"
                        style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    >
                        Building digital experiences at the intersection of<br />
                        code, design, and intelligence.
                    </p>

                    {/*

                        <div className="flex gap-3 mt-3 hero-text-anim">
                            <button
                                className="px-7 py-2.5 bg-cyan-400/[0.07] border border-cyan-400 text-cyan-400 text-xs font-bold tracking-[0.18em] uppercase hover:bg-cyan-400/[0.14] transition-colors"
                                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                            >
                                View Projects
                            </button>
                            <button
                                className="px-7 py-2.5 border border-cyan-200/20 text-cyan-200/40 text-xs font-bold tracking-[0.18em] uppercase hover:border-cyan-400/40 hover:text-cyan-200/60 transition-colors"
                                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                            >
                                Contact
                            </button>
                        </div>
                    */}
                </div>

                {/* RIGHT: Image frame */}
                <div className="hidden md:flex relative items-center justify-center h-[460px] hero-img-anim ">
                    {/* Outer decorative boxes */}
                    <div className="absolute inset-6 border border-cyan-500/[0.07] pointer-events-none" />
                    <div className="absolute inset-10 border border-cyan-500/5 pointer-events-none" />

                    {/* Main frame */}
                    <div className="relative w-[340px] h-[420px]">
                        {/* Corner brackets */}
                        {["top-0 left-0 border-t-[1.5px] border-l-[1.5px]",
                            "top-0 right-0 border-t-[1.5px] border-r-[1.5px]",
                            "bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]",
                            "bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]"].map((cls, i) => (
                                <div key={i} className={`absolute w-7 h-7 border-cyan-400 ${cls}`} />
                            ))}

                        {/* Corner dots */}
                        {["top-[-2px] left-[-2px]", "top-[-2px] right-[-2px]", "bottom-[-2px] left-[-2px]", "bottom-[-2px] right-[-2px]"].map((cls, i) => (
                            <div key={i} className={`absolute w-12 h-12 bg-cyan-400/60 ${cls}`} />
                        ))}

                        {/* Side accent lines */}
                        <div className="absolute top-5 bottom-5 left-[-10px] w-px bg-cyan-500/10" />
                        <div className="absolute top-5 bottom-5 right-[-10px] w-px bg-cyan-500/10" />

                        {/* Image */}
                        <div className="w-full h-full border border-cyan-500/20 overflow-hidden relative bg-cyan-950/20">
                            <Image
                                src="/my-profile.png"
                                alt="Profile"
                                fill
                                className="object-cover object-top"
                            />
                            {/* Scan line over image */}
                            <div
                                className="absolute left-0 right-0 h-px"
                                style={{
                                    background: "linear-gradient(90deg,transparent,rgba(0,229,255,0.55),transparent)",
                                    animation: "imgScan 3s ease-in-out infinite",
                                }}
                            />

                            <div
                                className="absolute top-0 flex items-center justify-center pointer-events-none"
                            >
                                <div
                                    className="relative w-[300px] h-[300px] animate-spin"
                                    style={{
                                        animationDuration: "18s",
                                    }}
                                >
                                    <Image
                                        src="/cyberCircle.png"
                                        alt="Cyber Circle"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Label */}
                        <div
                            className="absolute -bottom-6 left-0 right-0 text-center text-[8px] tracking-[0.22em] text-cyan-400/35"
                            style={{ fontFamily: "'Share Tech Mono', monospace" }}
                        >
                            ID_VERIFIED // ONLINE
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}