

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Contact() {

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const timeout = setTimeout(() => {
            const ctx = gsap.context(() => {

                // 1. Animate Header
                gsap.from(".contact-header", {
                    scrollTrigger: {
                        trigger: ".contact-header",
                        start: "top 85%",
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });

                // 2. Animate Main Terminal Window
                gsap.from(".contact-terminal", {
                    scrollTrigger: {
                        trigger: ".contact-terminal",
                        start: "top 80%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });

                // 3. Animate Inner Columns (Left Info, Right Form)
                gsap.from(".contact-col", {
                    scrollTrigger: {
                        trigger: ".contact-terminal", // Trigger based on the terminal window
                        start: "top 75%",
                    },
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2, // Left column appears, then right column
                    delay: 0.3,   // Wait slightly for the terminal box to slide up first
                    ease: "power3.out"
                });

            }, sectionRef);

            ScrollTrigger.refresh(); // Crucial for fixing pin spacing issues!

            return () => ctx.revert();
        }, 150);

        return () => clearTimeout(timeout);
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "d8c4631e-9613-4e7f-863b-86479e940169",
                    subject: "New Transmission from Portfolio Terminal",
                    from_name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
            console.log(error);

        }
    };

    return (
        <section id="contact" ref={sectionRef} className="relative w-full min-h-screen py-24 overflow-clip flex flex-col justify-center">

            {/* --- HEADER --- */}
            <div className="w-full max-w-7xl mx-auto px-6 mb-16">
                <div className="contact-header relative flex items-center justify-center gap-4 w-full md:w-3/4 mx-auto">
                    <div className="h-px bg-linear-to-r from-transparent to-cyan-500/50 grow hidden md:block" />
                    <div className="relative flex flex-col items-center border border-cyan-500/20 px-8 py-2 bg-cyan-950/20 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />

                        <span className="absolute -top-2.5 bg-[#050a0f] px-2 text-[10px] text-cyan-500/70 tracking-widest font-mono">DATA_BLOCK_04</span>
                        <p className="text-2xl md:text-3xl font-semibold tracking-widest text-gray-200 uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                            LETS_<span className="text-cyan-400">CONNECT</span>
                        </p>
                    </div>
                    <div className="h-px bg-linear-to-l from-transparent to-cyan-500/50 grow hidden md:block" />
                </div>
            </div>

            {/* --- TERMINAL WINDOW --- */}
            <div className="w-full max-w-5xl mx-auto px-6">
                <div className="contact-terminal w-full rounded-xl border border-cyan-500/30 bg-[#050a0f]/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,229,255,0.05)] overflow-hidden flex flex-col">

                    {/* Terminal Top Bar */}
                    <div className="w-full h-10 bg-cyan-950/60 border-b border-cyan-500/30 flex items-center justify-between px-4 shrink-0">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <p className="text-[10px] md:text-xs text-cyan-500/60 tracking-widest font-mono">
                            root@niwantha-system:~/contact_module
                        </p>
                        <div className="w-10" /> {/* Spacer */}
                    </div>

                    {/* Terminal Body (Split Layout) */}
                    <div className="flex flex-col md:flex-row w-full h-full">

                        {/* LEFT COLUMN: DIRECT CONTACT INFO */}
                        <div className="contact-col w-full md:w-2/5 p-8 border-b md:border-b-0 md:border-r border-cyan-500/20 bg-cyan-950/10 flex flex-col justify-center">
                            <p className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-6 font-mono">
                                &gt; ADMIN_DIRECTORIES
                            </p>

                            <div className="flex flex-col gap-6 font-mono text-sm">
                                {/* Email */}
                                <div className="flex  items-center gap-2 group">
                                    <Image
                                        src="/icons/gmail.png"
                                        alt="email"
                                        width={20}
                                        height={20}
                                    />
                                    <a href="mailto:your.email@gmail.com" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                        niwanthasanjulaofficial@gmail.com
                                    </a>
                                </div>

                                {/* Phone / WhatsApp */}
                                <div className="flex  items-center gap-2 group">
                                    <Image
                                        src="/icons/phone.png"
                                        alt="phone"
                                        width={20}
                                        height={20}
                                    />
                                    <a href="https://wa.me/947XXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                        +94 76 3983 136
                                    </a>
                                </div>

                                {/* LinkedIn */}
                                <div className="flex  items-center gap-2 group">
                                    <Image
                                        src="/icons/linkedin.png"
                                        alt="linked-in"
                                        width={20}
                                        height={20}
                                    />
                                    <a href="https://linkedin.com/in/niwantha-sanjula-2468b22b5" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                        linkedin.com/niwantha-sanjula
                                    </a>
                                </div>

                                {/* GitHub */}
                                <div className="flex items-center gap-2 group">
                                    <Image
                                        src="/icons/github.png"
                                        alt="github"
                                        width={20}
                                        height={20}
                                    />
                                    <a href="https://github.com/NiwanthaSanjula" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                        github.com/NiwanthaSanjula
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: THE FORM */}
                        <div className="contact-col w-full md:w-3/5 p-8 flex flex-col justify-center bg-transparent">

                            <p className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-6 font-mono">
                                &gt; INITIALIZE_MESSAGE
                            </p>

                            {status === "success" && (
                                <div className="mb-6 p-3 border border-green-500/40 bg-green-950/20 text-green-400 font-mono text-sm">
                                    &gt; TRANSMISSION SUCCESSFUL. I will respond shortly.
                                </div>
                            )}
                            {status === "error" && (
                                <div className="mb-6 p-3 border border-red-500/40 bg-red-950/20 text-red-400 font-mono text-sm">
                                    &gt; TRANSMISSION FAILED. ERROR 500. Please try again.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                                {/* Name Input */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="text-cyan-500/80 text-xs font-mono tracking-widest">
                                        var sender_name =
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        disabled={status === "submitting"}
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-cyan-950/20 border border-cyan-500/30 rounded focus:border-cyan-400 focus:bg-cyan-950/40 outline-none text-cyan-100 p-3 transition-colors font-mono text-sm"
                                        placeholder="Enter your name..."
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="text-cyan-500/80 text-xs font-mono tracking-widest">
                                        var sender_email =
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        disabled={status === "submitting"}
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-cyan-950/20 border border-cyan-500/30 rounded focus:border-cyan-400 focus:bg-cyan-950/40 outline-none text-cyan-100 p-3 transition-colors font-mono text-sm"
                                        placeholder="Enter your email address..."
                                    />
                                </div>

                                {/* Message Input */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="message" className="text-cyan-500/80 text-xs font-mono tracking-widest">
                                        const payload_data =
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        disabled={status === "submitting"}
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full bg-cyan-950/20 border border-cyan-500/30 rounded focus:border-cyan-400 focus:bg-cyan-950/40 outline-none text-cyan-100 p-3 transition-colors font-mono text-sm resize-none"
                                        placeholder="Type your message here..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="mt-2 flex items-center justify-end">
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="px-8 py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-400 text-sm font-bold tracking-[0.15em] uppercase hover:bg-cyan-400 hover:text-[#050a0f] disabled:opacity-50 transition-all font-mono"
                                    >
                                        {status === "submitting" ? "EXECUTING..." : "SEND_MESSAGE"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}