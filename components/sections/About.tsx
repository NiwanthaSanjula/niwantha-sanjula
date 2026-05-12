"use client"

import { TechStackOrbit } from "../ui/TechStackOrbit";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const softskills = [
    { name: "Communication", progress: 85 },
    { name: "Teamwork", progress: 75 },
    { name: "Problem Solving", progress: 80 },
    { name: "Adaptability", progress: 88 },
    { name: "Time Management", progress: 90 },
]

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            //  Animate the Header (MY_ORIGIN)
            gsap.from(".about-header", {
                scrollTrigger: {
                    trigger: ".about-header",
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            // Animate the Bio and Orbit (Staggered)
            gsap.from(".about-top-row", {
                scrollTrigger: {
                    trigger: ".about-top-row",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2, // Bio animates first, then Orbit
                ease: "power3.out"
            });

            // Animate the Bottom Skills Boxes (Staggered)
            gsap.from(".about-bottom-row", {
                scrollTrigger: {
                    trigger: ".about-bottom-row",
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2, // Currently Learning animates, then Soft Skills
                ease: "power3.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="relative w-full min-h-screen py-24 flex justify-center">

            <div className="absolute -left-12 opacity-50">
                <div
                    className="w-[400px] h-[400px] border-2 rounded-full border-cyan-500 border-dashed border-l-transparent border-r-transparent animate-spin"
                    style={{
                        animationDuration: "18s",
                    }}
                />

            </div>

            <div className="w-full max-w-7xl mx-auto ">
                <div className="about-header relative flex items-center justify-center gap-4 w-full md:w-3/4 mx-auto">
                    {/* Left fading line */}
                    <div className="h-px bg-linear-to-r from-transparent to-cyan-500/50 grow hidden md:block" />

                    {/* Main Text Box */}
                    <div className="relative flex flex-col items-center border border-cyan-500/20 px-8 py-3 bg-cyan-950/20 backdrop-blur-sm">
                        {/* 4 Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />

                        {/* Tiny top label */}
                        <span className="absolute -top-2.5 bg-[#050a0f] px-2 text-[10px] text-cyan-500/70 tracking-widest font-mono">
                            DATA_BLOCK_01
                        </span>

                        <p
                            className="text-3xl md:text-4xl font-semibold tracking-widest text-gray-200 uppercase"
                            style={{ fontFamily: "'Share Tech Mono', monospace" }}
                        >
                            MY_<span className="text-cyan-400">ORIGIN</span>
                        </p>
                    </div>

                    {/* Right fading line */}
                    <div className="h-px bg-linear-to-l from-transparent to-cyan-500/50 grow hidden md:block" />
                </div>

                <div
                    className="grid gap-2.5 p-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2">

                        <div className="about-top-row relative flex flex-col items-center lg:items-start border p-6 md:p-8 border-cyan-400/40 bg-cyan-500/5 backdrop-blur-xs overflow-hidden group">

                            <div className="absolute w-4 h-4 left-0 top-0 border-cyan-500 border-t-2 border-l-2" />
                            <div className="absolute w-4 h-4 right-0 top-0 border-cyan-500 border-t-2 border-r-2" />
                            <div className="absolute w-4 h-4 left-0 bottom-0 border-cyan-500 border-b-2 border-l-2" />
                            <div className="absolute w-4 h-4 right-0 bottom-0 border-cyan-500 border-b-2 border-r-2" />

                            {/* Animated HUD Dot */}
                            <div className="absolute w-2 h-2 bg-cyan-500 rounded-full animate-ping right-6 top-6" />
                            <div className="absolute w-1.5 h-1.5 bg-cyan-200 rounded-full right-[25px] top-[25px]" />



                            {/* Detailed Bio Content */}
                            <div className="flex flex-col gap-4 text-[15px]">
                                <p className="text-gray-300 leading-relaxed font-light">
                                    <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs block mb-1" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                                        &gt; INIT_PROFILE
                                    </span>
                                    <span className="text-cyan-400 font-bold tracking-wider text-xl">Hi, I&apos;m Niwantha Sanjula, </span>
                                    a Software Engineering undergraduate at <span className="font-semibold">The Open University of Sri Lanka</span>. I specialize in architecting scalable, end-to-end cloud ecosystems using the <span className="font-semibold">MERN & PERN stacks, Java SpringBoot, and Next.js.</span>
                                </p>

                                <p className="text-gray-400 leading-relaxed font-light">
                                    <span className="text-cyan-500/70 font-bold tracking-widest uppercase text-xs block mb-1" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                                        &gt; SYS_ARCHITECTURE
                                    </span>
                                    I treat code as a fluid tool to solve complex, real-world problems. By blending heavy backend logic with my background in graphic design, I build systems that are robust, secure, and visually commanding. I&apos;m also committed to FOSS, believing scalable tech should create real community impact.
                                </p>

                                <p className="text-gray-400 leading-relaxed font-light">
                                    <span className="text-cyan-500/70 font-bold tracking-widest uppercase text-xs block mb-1" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                                        &gt; ACTIVE_RESEARCH
                                    </span>
                                    Currently expanding into Python-driven ML and neural networks, moving beyond static data to build autonomous, intelligent web applications that learn and adapt.
                                </p>

                                <div className="border-l-2 border-cyan-500 pl-4 py-1 bg-cyan-950/20">
                                    <p className="text-cyan-200 text-sm tracking-wider" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                                        <span className="text-cyan-500 font-bold mr-2">CURRENT_DIRECTIVE:</span>
                                        Seeking a Software Engineering Internship to deploy my skills in a high-velocity production environment.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="about-top-row relative border border-cyan-400/40 bg-cyan-500/5 backdrop-blur-xs overflow-hidden flex flex-col p-4">
                            <TechStackOrbit />
                        </div>
                    </div>

                    <div className="grid grid-rows-1 gap-2.5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            <div className="about-bottom-row relative border border-cyan-400/40 bg-cyan-500/5 backdrop-blur-xs p-4 flex flex-col overflow-hidden">

                                <div className="absolute w-4 h-4 left-0 top-0 border-cyan-500 border-t-2 border-l-2" />
                                <div className="absolute w-4 h-4 right-0 top-0 border-cyan-500 border-t-2 border-r-2" />
                                <div className="absolute w-4 h-4 left-0 bottom-0 border-cyan-500 border-b-2 border-l-2" />
                                <div className="absolute w-4 h-4 right-0 bottom-0 border-cyan-500 border-b-2 border-r-2" />

                                {/* Subtle corner bracket for the HUD aesthetic */}
                                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan-400/30 rounded-tr-lg" />

                                <p
                                    className="text-sm uppercase font-bold tracking-wider text-cyan-500 mb-4"
                                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                                >
                                    &gt; CURRENTLY_LEARNING
                                </p>

                                <div className="space-y-2.5">
                                    {[
                                        { name: "Neural Networks", progress: 25 },
                                        { name: "Docker/Kubernetes", progress: 30 },
                                        { name: "TensorFlow/Keras", progress: 10 },
                                        { name: "LangChain", progress: 10 },
                                        { name: "AI Engineering", progress: 10 },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="relative flex items-center justify-between border px-3 py-1.5 rounded border-cyan-400/25 bg-cyan-950/20 backdrop-blur-xs overflow-hidden group"
                                        >
                                            {/* 1. The Background Loading Bar */}
                                            {/* It uses inline styles to set the width based on your progress variable */}
                                            <div
                                                className="absolute left-0 top-0 h-full bg-cyan-500/10 border-r border-cyan-500/40 transition-all duration-1000 ease-out group-hover:bg-cyan-500/20"
                                                style={{ width: `${item.progress}%` }}
                                            />

                                            {/* 2. The Text (Needs relative z-10 so it sits ABOVE the background bar) */}
                                            <div className="relative z-10 flex items-center gap-2">
                                                <span className="text-cyan-500 text-xs opacity-50">&gt;</span>
                                                <p className="text-[14px] text-cyan-100">{item.name}</p>
                                            </div>

                                            {/* 3. The Percentage Readout */}
                                            <div className="relative z-10">
                                                <p
                                                    className="text-[10px] text-cyan-400/60 tracking-widest"
                                                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                                                >
                                                    {item.progress}%
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="about-bottom-row border border-cyan-400/40 bg-cyan-500/5 backdrop-blur-xs p-4 flex flex-col relative overflow-hidden">

                                <div className="absolute w-4 h-4 left-0 top-0 border-cyan-500 border-t-2 border-l-2" />
                                <div className="absolute w-4 h-4 right-0 top-0 border-cyan-500 border-t-2 border-r-2" />
                                <div className="absolute w-4 h-4 left-0 bottom-0 border-cyan-500 border-b-2 border-l-2" />
                                <div className="absolute w-4 h-4 right-0 bottom-0 border-cyan-500 border-b-2 border-r-2" />

                                {/* Subtle corner bracket for the HUD aesthetic */}
                                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan-400/30 rounded-tr-lg" />

                                <p
                                    className="text-sm uppercase font-bold tracking-wider text-cyan-500 mb-4"
                                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                                >
                                    &gt; Soft Skills
                                </p>

                                <div className="space-y-2.5">
                                    {softskills.map((item, i) => (
                                        <div
                                            key={i}
                                            className="relative flex items-center justify-between border px-3 py-1.5 rounded border-cyan-400/25 bg-cyan-950/20 backdrop-blur-xs overflow-hidden group"
                                        >
                                            {/* 1. The Background Loading Bar */}
                                            {/* It uses inline styles to set the width based on your progress variable */}
                                            <div
                                                className="absolute left-0 top-0 h-full bg-cyan-500/10 border-r border-cyan-500/40 transition-all duration-1000 ease-out group-hover:bg-cyan-500/20"
                                                style={{ width: `${item.progress}%` }}
                                            />

                                            {/* 2. The Text (Needs relative z-10 so it sits ABOVE the background bar) */}
                                            <div className="relative z-10 flex items-center gap-2">
                                                <span className="text-cyan-500 text-xs opacity-50">&gt;</span>
                                                <p className="text-[14px] text-cyan-100">{item.name}</p>
                                            </div>

                                            {/* 3. The Percentage Readout */}
                                            <div className="relative z-10">
                                                <p
                                                    className="text-[10px] text-cyan-400/60 tracking-widest"
                                                    style={{ fontFamily: "'Share Tech Mono', monospace" }}
                                                >
                                                    {item.progress}%
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}