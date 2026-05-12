"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SKILLS_DATA = [
    {
        id: 1,
        title: "FRONTEND_CLIENT",
        tech: "Next.js, React, React-native, Tailwind, GSAP",
        angle: 45,
        description: "Building creative, responsive, high-performance interfaces. Component architecture.",
    },
    {
        id: 2,
        title: "BACKEND_LOGIC",
        tech: "Node.js, Express, Spring Boot, REST APIs",
        angle: 135,
        description: "Architecting secure, scalable server-side applications and heavy logic processing."
    },
    {
        id: 3,
        title: "DATA_LAYER",
        tech: "PostgreSQL, MongoDB, Prisma, Supabase",
        angle: 225,
        description: "Designing robust database schemas and optimizing complex data retrieval."
    },
    {
        id: 4,
        title: "TOOLS_AND_PLATFORMS",
        tech: "Docker, Git, GitHub, JIRA, Figma",
        angle: 315,
        description: "Standardized tools and cloud platforms for deploying great applications."
    },
];

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const radarSweeperRef = useRef<HTMLDivElement>(null);
    const activeIndexRef = useRef(-1);

    const [activeSkill, setActiveSkill] = useState(-1);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Removed the setTimeout so this executes immediately on mount
        const ctx = gsap.context(() => {

            gsap.from(".skills-header", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(".skills-intro-anim", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2500",
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    refreshPriority: 1, // Forces GSAP to calculate this pin BEFORE the Projects section
                    onUpdate: (self) => {
                        const currentAngle = self.progress * 360;

                        let newIndex = -1;
                        SKILLS_DATA.forEach((skill, i) => {
                            if (currentAngle >= skill.angle) {
                                newIndex = i;
                            }
                        });

                        if (newIndex !== activeIndexRef.current) {
                            activeIndexRef.current = newIndex;
                            setActiveSkill(newIndex);
                        }
                    }
                }
            });

            tl.to(radarSweeperRef.current, {
                rotation: 360,
                ease: "none"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="skills" className="relative w-full min-h-screen overflow-clip flex flex-col">

            {/* Global Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* --- HEADER --- */}
            <div className="absolute top-6 md:top-10 w-full max-w-7xl left-1/2 -translate-x-1/2 px-4 md:px-6 z-50">
                <div className="skills-header relative flex items-center justify-center gap-4 w-full md:w-3/4 mx-auto">
                    <div className="h-px bg-linear-to-r from-transparent to-cyan-500/50 grow hidden md:block" />
                    <div className="relative flex flex-col items-center border border-cyan-500/20 px-6 md:px-8 py-2 bg-cyan-950/20 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />

                        <span className="absolute -top-2.5 bg-[#050a0f] px-2 text-[8px] md:text-[10px] text-cyan-500/70 tracking-widest font-mono">DATA_BLOCK_02</span>
                        <p className="text-xl md:text-3xl font-semibold tracking-widest text-gray-200 uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                            MY_<span className="text-cyan-400">SKILLS</span>
                        </p>
                    </div>
                    <div className="h-px bg-linear-to-l from-transparent to-cyan-500/50 grow hidden md:block" />
                </div>
            </div>

            {/* --- MAIN LAYOUT (Flex-Col on Mobile, Flex-Row on Desktop) --- */}
            <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-6 pt-24 md:pt-32 pb-10 h-screen gap-6 md:gap-0">

                {/* LEFT: THE STACKING CARDS */}
                <div className="skills-intro-anim w-full md:w-[45%] flex flex-col justify-center gap-2 md:gap-3">
                    {activeSkill === -1 ? (
                        <div className="border border-cyan-500/20 bg-cyan-950/10 p-6 md:p-8 rounded-xl backdrop-blur-sm flex flex-col items-center justify-center text-center h-[180px] md:h-[300px]">
                            <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
                            <p className="text-cyan-500 tracking-[0.2em] md:tracking-[0.3em] font-bold animate-pulse text-xs md:text-base" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                                INITIATING RADAR SCAN...
                            </p>
                        </div>
                    ) : (
                        SKILLS_DATA.map((skill, index) => {
                            if (index > activeSkill) return null;

                            return (
                                <div
                                    key={skill.id}
                                    className="border border-cyan-400/40 bg-cyan-500/10 p-3 md:p-5 backdrop-blur-md relative overflow-hidden animate-[cyberPop_0.4s_ease-out_forwards] shadow-[0_0_15px_rgba(0,229,255,0.05)]"
                                >
                                    <div className="absolute left-0 top-0 w-4 md:w-6 h-4 md:h-6 border-cyan-500 border-t-2 border-l-2" />
                                    <div className="absolute right-0 top-0 w-4 md:w-6 h-4 md:h-6 border-cyan-500 border-t-2 border-r-2" />
                                    <div className="absolute left-0 bottom-0 w-4 md:w-6 h-4 md:h-6 border-cyan-500 border-b-2 border-l-2" />
                                    <div className="absolute right-0 bottom-0 w-4 md:w-6 h-4 md:h-6 border-cyan-500 border-b-2 border-r-2" />

                                    <div className="absolute top-0 right-0 w-8 md:w-10 h-8 md:h-10 bg-cyan-500/10 rounded-bl-full" />
                                    <div className="absolute top-1 right-2 text-cyan-500/30 font-bold text-lg md:text-2xl" style={{ fontFamily: "'Michroma', sans-serif" }}>
                                        0{skill.id}
                                    </div>

                                    <p className="text-cyan-400 text-[10px] md:text-xs tracking-widest font-bold mb-1 uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                                        &gt; {skill.title}
                                    </p>

                                    <div className="flex flex-wrap gap-1 md:gap-2 text-cyan-200 text-[9px] md:text-sm font-medium tracking-wider mb-1 md:mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                        {skill.tech.split(',').map((item, index) => (
                                            <span key={index} className="border border-cyan-500/50 bg-cyan-500/25 px-1.5 md:px-2 py-0.5 rounded-full">
                                                {item}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-gray-400 text-[10px] md:text-sm leading-tight md:leading-relaxed">
                                        {skill.description}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* RIGHT: THE RADAR */}
                <div className="skills-intro-anim w-full md:w-1/2 flex items-center justify-center relative">
                    <div className="hidden md:block absolute left-0 top-0 w-12 h-12 border-cyan-500 border-l-2 border-t-2" />
                    <div className="hidden md:block absolute right-0 top-0 w-12 h-12 border-cyan-500 border-r-2 border-t-2" />
                    <div className="hidden md:block absolute left-0 bottom-0 w-12 h-12 border-cyan-500 border-l-2 border-b-2" />
                    <div className="hidden md:block absolute right-0 bottom-0 w-12 h-12 border-cyan-500 border-r-2 border-b-2" />

                    <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[450px] md:h-[450px] flex items-center justify-center">

                        <div className="absolute w-full h-full rounded-full border border-cyan-500/30 bg-cyan-950/10 shadow-[inset_0_0_50px_rgba(0,229,255,0.05)]" />
                        <div className="absolute w-[75%] h-[75%] rounded-full border border-cyan-500/20 border-dashed" />
                        <div className="absolute w-[50%] h-[50%] rounded-full border border-cyan-500/20" />
                        <div className="absolute w-[25%] h-[25%] rounded-full border border-cyan-500/40" />

                        <div className="absolute w-full h-px bg-cyan-500/20" />
                        <div className="absolute h-full w-px bg-cyan-500/20" />
                        <div className="absolute w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#00e5ff] animate-pulse" />

                        {SKILLS_DATA.map((skill, index) => {
                            const isDetected = activeSkill >= index;
                            return (
                                <div key={skill.id} className="absolute inset-0 z-10" style={{ transform: `rotate(${skill.angle}deg)` }}>
                                    <div className={`absolute top-[12.5%] left-1/2 -translate-x-1/2 w-2 h-2 md:w-4 md:h-4 rounded-full transition-all duration-700 ${isDetected ? 'bg-cyan-400 shadow-[0_0_20px_#00e5ff] scale-125' : 'opacity-0'}`} />
                                </div>
                            )
                        })}

                        <div ref={radarSweeperRef} className="absolute w-full h-full rounded-full z-0 radar-sweeper-bg">
                            <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-cyan-300 shadow-[0_0_10px_#00e5ff] -translate-x-1/2 origin-bottom" />
                        </div>

                    </div>
                </div>

            </div>

            <style>{`
                .radar-sweeper-bg {
                    background: conic-gradient(from 0deg, rgba(0, 229, 255, 0.4) 0deg, rgba(0, 229, 255, 0.05) 45deg, transparent 90deg, transparent 360deg);
                    transform-origin: center center;
                }
                @keyframes cyberPop {
                    0% { opacity: 0; transform: translateY(10px) scale(0.98); filter: blur(4px); }
                    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
                }
            `}</style>

        </section>
    );
}