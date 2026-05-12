import Image from "next/image";

const techstack = [
    { label: "Next JS", icon: "/icons/nextjs.png" },
    { label: "React", icon: "/icons/react.png" },
    { label: "TypeScript", icon: "/icons/typescript.png" },
    { label: "PostgreSQL", icon: "/icons/postgresql.png" },
    { label: "MongoDB", icon: "/icons/mongo-db.png" },
    { label: "Express JS", icon: "/icons/express-js.png" },
    { label: "Spring Boot", icon: "/icons/spring-boot.png" },
    { label: "Tailwind CSS", icon: "/icons/tailwind.png" },
    { label: "Git & GitHub", icon: "/icons/github-white.png" },
    { label: "Figma", icon: "/icons/figma.png" },
];

// 3-4-3 split across three orbits
const ORBITS = [
    {
        radius: 58,
        duration: 12,
        reverse: false,
        iconSize: 30,
        icons: [techstack[0], techstack[1], techstack[2]],
    },
    {
        radius: 105,
        duration: 22,
        reverse: true,
        iconSize: 30,
        icons: [techstack[3], techstack[4], techstack[5], techstack[6]],
    },
    {
        radius: 152,
        duration: 34,
        reverse: false,
        iconSize: 24,
        icons: [techstack[7], techstack[8], techstack[9]],
    },
] as const;

export function TechStackOrbit() {
    return (
        <>

            {/* Corner accents */}
            <div className="absolute w-4 h-4 left-0 top-0 border-t-2 border-l-2 border-cyan-500" />
            <div className="absolute w-4 h-4 right-0 top-0 border-t-2 border-r-2 border-cyan-500" />
            <div className="absolute w-4 h-4 left-0 bottom-0 border-b-2 border-l-2 border-cyan-500" />
            <div className="absolute w-4 h-4 right-0 bottom-0 border-b-2 border-r-2 border-cyan-500" />

            {/* Keyframes */}
            <style>{`
                @keyframes orbit-cw  { to { transform: rotate(360deg);  } }
                @keyframes orbit-ccw { to { transform: rotate(-360deg); } }
                @keyframes core-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.0), 0 0 8px 2px rgba(34,211,238,0.5); }
                    50%       { box-shadow: 0 0 0 6px rgba(34,211,238,0.08), 0 0 16px 4px rgba(34,211,238,0.7); }
                }
            `}</style>

            {/* Title */}
            <p
                className="text-sm uppercase font-bold tracking-wider text-cyan-500 mb-1 shrink-0"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
            >
                &gt; Main Tech Stack
            </p>

            {/* Orbital stage */}
            <div className="relative flex-1 flex items-center justify-center" style={{ minHeight: 336 }}>

                {/* Orbit rings */}
                {ORBITS.map((orbit, oi) => (
                    <div
                        key={`ring-${oi}`}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: orbit.radius * 2,
                            height: orbit.radius * 2,
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            border: "1.5px dashed rgba(6,182,212,0.22)",
                        }}
                    />
                ))}

                {/* Center — pulsing core */}
                <div
                    className="absolute z-20 rounded-full bg-cyan-400"
                    style={{
                        width: 10,
                        height: 10,
                        animation: "core-pulse 2.8s ease-in-out infinite",
                    }}
                />
                {/* Inner bright dot */}
                <div
                    className="absolute z-30 rounded-full bg-white"
                    style={{ width: 4, height: 4 }}
                />

                {/* Orbiting icons */}
                {ORBITS.map((orbit, oi) =>
                    orbit.icons.map((tech, ii) => {
                        const angle = (360 / orbit.icons.length) * ii;
                        const delay = `${-((angle / 360) * orbit.duration).toFixed(3)}s`;
                        const armAnim = orbit.reverse ? "orbit-ccw" : "orbit-cw";
                        const iconAnim = orbit.reverse ? "orbit-cw" : "orbit-ccw";
                        const pad = 4;

                        return (
                            <div
                                key={`arm-${oi}-${ii}`}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    width: 0,
                                    height: 0,
                                    animation: `${armAnim} ${orbit.duration}s linear infinite`,
                                    animationDelay: delay,
                                }}
                            >
                                {/* Counter-rotating icon wrapper */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: -(orbit.radius + orbit.iconSize / 2 + pad),
                                        left: -(orbit.iconSize / 2 + pad),
                                        width: orbit.iconSize + pad * 2,
                                        height: orbit.iconSize + pad * 2,
                                        animation: `${iconAnim} ${orbit.duration}s linear infinite`,
                                        animationDelay: delay,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "rgba(8,145,178,0.10)",
                                        border: "1px solid rgba(6,182,212,0.35)",
                                        borderRadius: "7px",
                                        backdropFilter: "blur(6px)",
                                        padding: `${pad}px`,
                                    }}
                                >
                                    <Image
                                        src={tech.icon}
                                        alt={tech.label}
                                        width={orbit.iconSize}
                                        height={orbit.iconSize}
                                        priority
                                        className="rounded object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}