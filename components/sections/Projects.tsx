"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Project = {
    id: string;
    title: string;
    type: string;
    description: string;
    tech: string[];
    image: string;
    github: string;
    live?: string;
};

const PROJECTS_DATA: Project[] = [
    {
        id: "01",
        title: "LA TAVOLA - RESTAURANT MANAGEMENT & POS",
        type: "FULL-STACK / RESTAURANT OPERATIONS",
        description: "Full-stack POS and operations platform for sales, purchasing, inventory, customers, and suppliers. Includes JWT and role-based access, transactional checkout with idempotent requests, and Jest regression tests.",
        tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "Tailwind CSS", "JWT", "Jest"],
        image: "/Restaurant_ERP .png",
        github: "https://github.com/NiwanthaSanjula/restaurant-ERP/",
        live: "https://restaurant-erp-one.vercel.app/",
    },
    {
        id: "02",
        title: "WARRIOR FITNESS - GYM MEMBER MANAGEMENT & POS",
        type: "FULL-STACK / GYM OPERATIONS",
        description: "Gym operations platform for member registration, renewals, attendance, invoicing, payments, and equipment maintenance. Adds JWT and role-based permissions, session revocation, financial reporting, and daily cash reconciliation.",
        tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Vitest", "Supertest"],
        image: "/warrior-fitness.png",
        github: "https://github.com/NiwanthaSanjula/warrior-fitness",
        live: "https://warrior-fitness-demo.vercel.app/",
    },
    {
        id: "03",
        title: "RANDENIYA RESORT - HOTEL BOOKING",
        type: "RESORT / BOOKING EXPERIENCE",
        description: "A resort landing page with a booking-focused experience for exploring rooms, availability, and stay reservations. Built with Next.js, TypeScript, Tailwind CSS, and GSAP.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
        image: "/randeniya-resort.png",
        github: "https://github.com/NiwanthaSanjula/randeniyalakeresort",
        live: "https://randeniyalakeresort.vercel.app/",
    },
    {
        id: "04",
        title: "SOLESTYLE SHOE STORE",
        type: "FULL-STACK / DASHBOARD",
        description: "A comprehensive e-commerce ecosystem featuring a dedicated admin control panel. Engineered to handle secure product inventory, order routing, and dynamic user carts with real-time data synchronization.",
        tech: ["React", "MongoDB", "Express.js", "Node.js", "Stripe payment", "REST API", "JWT"],
        image: "/shoe-store-dashboard.png",
        github: "https://github.com/NiwanthaSanjula/the-foot-shop",
    },
];

export default function Projects() {

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // 1. Animate the Header
            gsap.from(".projects-header", {
                scrollTrigger: {
                    trigger: ".projects-header",
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            // 2. Animate Each Project Row Individually
            const projectRows = gsap.utils.toArray<HTMLElement>(".project-row");

            projectRows.forEach((row) => {
                const isEven = row.classList.contains("row-even");
                const textEl = row.querySelector(".project-text");
                const imgEl = row.querySelector(".project-image");
                const card3D = row.querySelector(".card-3d"); // We will add this class next

                // Text slides in from the side
                gsap.from(textEl, {
                    scrollTrigger: {
                        trigger: row,
                        start: "top 80%",
                    },
                    x: isEven ? -100 : 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });

                // Image Wrapper slides in
                gsap.from(imgEl, {
                    scrollTrigger: {
                        trigger: row,
                        start: "top 80%",
                    },
                    x: isEven ? 100 : -100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });

                // Scroll Scrubbing!
                gsap.fromTo(card3D,
                    {
                        // Starting state (Tilted and slightly smaller)
                        rotationY: isEven ? -20 : 20,
                        rotationX: 8,
                        scale: 0.9,
                        transformPerspective: 1000
                    },
                    {
                        // Ending state (Perfectly flat)
                        rotationY: 0,
                        rotationX: 0,
                        scale: 1,
                        scrollTrigger: {
                            trigger: row,
                            start: "top bottom",   // Start rotating when it enters the bottom of the screen
                            end: "center center",  // Finish flattening exactly when it hits the middle of the screen
                            scrub: 1,              // The magic property: binds rotation to your scroll wheel with 1s smoothing
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="relative w-full min-h-screen py-24 bg-[#050a0f]/50 overflow-clip">

            {/* --- HEADER --- */}
            <div className="w-full max-w-7xl mx-auto px-6 mb-20">
                <div className="projects-header relative flex items-center justify-center gap-4 w-full md:w-3/4 mx-auto">
                    <div className="h-px bg-linear-to-r from-transparent to-cyan-500/50 grow hidden md:block" />
                    <div className="relative flex flex-col items-center border border-cyan-500/20 px-8 py-2 bg-cyan-950/20 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />

                        <span className="absolute -top-2.5 bg-[#050a0f] px-2 text-[10px] text-cyan-500/70 tracking-widest font-mono">DATA_BLOCK_03</span>
                        <p className="text-2xl md:text-3xl font-semibold tracking-widest text-gray-200 uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                            MY_<span className="text-cyan-400">PROJECTS</span>
                        </p>
                    </div>
                    <div className="h-px bg-linear-to-l from-transparent to-cyan-500/50 grow hidden md:block" />
                </div>
            </div>

            {/* --- PROJECTS LIST --- */}
            <div className="w-full max-w-7xl mx-auto px-6 flex flex-col gap-32">
                {PROJECTS_DATA.map((project, index) => {
                    // Check if the index is even or odd to flip the layout
                    const isEven = index % 2 === 0;

                    return (
                        <div
                            key={project.id}
                            className={`project-row ${isEven ? 'row-even' : 'row-odd'} flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
                        >
                            {/* --- TEXT CONTENT (50%) --- */}
                            <div className="project-text w-full lg:w-1/2 flex flex-col relative">

                                <div className="absolute -top-16 -left-4 text-cyan-500/10 font-bold text-8xl pointer-events-none" style={{ fontFamily: "'Michroma', sans-serif" }}>
                                    {project.id}
                                </div>

                                <p className="text-cyan-400 text-xs tracking-[0.2em] font-bold mb-2 uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                                    {`// ${project.type}`}
                                </p>

                                <h3 className="text-white text-3xl md:text-4xl font-bold tracking-wider mb-6 uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 border-l-2 border-cyan-500/30 pl-4 bg-cyan-950/10 py-2">
                                    {project.description}
                                </p>

                                {/* Tech Stack Map */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-sm font-black text-cyan-950 border border-cyan-500/30 bg-cyan-500 tracking-wider"
                                            style={{ fontFamily: "'Share Tech Mono', monospace" }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <Link href={project.github} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 border border-cyan-200/20 text-cyan-200/50 text-xs font-bold tracking-[0.15em] uppercase hover:border-cyan-400/50 hover:text-cyan-200 transition-all" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                        <span>GitHub</span>
                                    </Link>
                                    {project.live ? (
                                        <Link href={project.live} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 border border-cyan-200/20 text-cyan-200/50 text-xs font-bold tracking-[0.15em] uppercase hover:border-cyan-400/50 hover:text-cyan-200 transition-all" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                            <span>Live Demo</span>
                                        </Link>
                                    ) : (
                                        <button type="button" disabled className="px-6 py-2.5 border border-cyan-200/10 text-cyan-200/30 text-xs font-bold tracking-[0.15em] uppercase cursor-not-allowed" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                            <span>Live Demo Soon</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* --- THE 3D CSS SCREEN (50%) --- */}
                            <div className="project-image w-full lg:w-1/2 flex justify-center">
                                {/* Added 'card-3d' class, removed all hover/isometric classes */}
                                <div className="card-3d relative w-full max-w-lg aspect-video rounded-lg border border-cyan-500/30 bg-[#050a0f] shadow-[0_0_30px_rgba(0,229,255,0.1)]">

                                    <div className="w-full h-6 bg-cyan-950/50 border-b border-cyan-500/30 flex items-center px-3 gap-1.5 rounded-t-lg">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                    </div>

                                    <div className="relative w-full h-[calc(100%-1.5rem)] overflow-hidden rounded-b-lg">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-top opacity-80 hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,229,255,0.1)_50%,transparent_100%)] bg-size-[100%_4px] opacity-30" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

        </section>
    );
}


