"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Register ScrollTrigger if it isn't already
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Lenis
        const lenis = new Lenis({
            autoRaf: true, // Automatically run requestAnimationFrame
            duration: 1.2, // The "heaviness" or smoothness of the scroll
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing curve
        });

        // Sync Lenis scroll with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Tell GSAP to use Lenis's requestAnimationFrame
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Prevent GSAP from lagging behind the scroll
        gsap.ticker.lagSmoothing(0);

        // Cleanup on unmount
        return () => {
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}