"use client";

export default function BackgroundHUD() {
    return (
        // 'fixed inset-0' locks this to the viewport. '-z-50' pushes it behind everything.
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-[#050a0f] overflow-hidden">

            {/* 1. The Global Cyber Grid with Center Glow */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />
            {/* Radial gradient that fades out the edges so the center pops */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08)_0%,#050a0f_70%)]" />

            {/* 2. The HUD Frame SVG */}
            {/* preserveAspectRatio="xMidYMid slice" ensures it covers mobile screens without squishing */}
            <svg
                className="absolute inset-0 w-full h-full opacity-80"
                viewBox="0 0 1440 900"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <style>{`
                        .da1{stroke-dasharray:50 10;animation:da 5s linear infinite;}
                        .da2{stroke-dasharray:30 14;animation:da 4s linear infinite reverse;}
                        .da3{stroke-dasharray:20 8;animation:da 6s linear infinite;}
                        .cp{animation:cp 2.5s ease-in-out infinite;}
                        .cp2{animation:cp 2.5s ease-in-out infinite 1.25s;}
                        .blink{animation:bl 1.2s step-end infinite;}
                        .scan{animation:scan 7s ease-in-out infinite;}
                        @keyframes da{to{stroke-dashoffset:-300;}}
                        @keyframes cp{0%,100%{opacity:.45;}50%{opacity:1;}}
                        @keyframes bl{50%{opacity:0;}}
                        @keyframes scan{
                            0%{transform:translateY(0);opacity:0;}
                            10%{opacity:.3;}90%{opacity:.3;}
                            100%{transform:translateY(880px);opacity:0;}
                        }
                    `}</style>
                </defs>

                {/* Scan line (Thicker) */}
                <line x1="0" y1="10" x2="1440" y2="10" stroke="#00e5ff" strokeWidth="2" opacity=".25" className="scan" />

                {/* Top-left corner (Thicker) */}
                <g className="cp" stroke="#00e5ff" strokeWidth="2" fill="none">
                    <path d="M24 82 L24 140 M24 82 L82 82" />
                    <rect x="24" y="82" width="10" height="10" fill="#00e5ff" opacity=".4" />
                    <line x1="92" y1="82" x2="180" y2="82" stroke="#00e5ff" strokeWidth="1.5" opacity=".5" />
                </g>

                {/* Top-right corner (Thicker) */}
                <g className="cp" stroke="#00e5ff" strokeWidth="2" fill="none">
                    <path d="M1416 82 L1416 140 M1416 82 L1358 82" />
                    <rect x="1406" y="82" width="10" height="10" fill="#00e5ff" opacity=".4" />
                    <line x1="1260" y1="82" x2="1348" y2="82" stroke="#00e5ff" strokeWidth="1.5" opacity=".5" />
                </g>

                {/* Top horizontal bars (Thicker) */}
                <line x1="196" y1="82" x2="1244" y2="82" stroke="#00e5ff" strokeWidth="1.5" opacity=".25" className="da1" />
                <line x1="40" y1="104" x2="500" y2="104" stroke="#00e5ff" strokeWidth="1" opacity=".3" className="da2" />
                <line x1="940" y1="104" x2="1400" y2="104" stroke="#00e5ff" strokeWidth="1" opacity=".3" className="da3" />

                {/* Bottom corners (Thicker) */}
                <g className="cp2" stroke="#00e5ff" strokeWidth="2" fill="none">
                    <path d="M24 870 L24 812 M24 870 L82 870" />
                    <path d="M1416 870 L1416 812 M1416 870 L1358 870" />
                </g>
                <line x1="92" y1="870" x2="1348" y2="870" stroke="#00e5ff" strokeWidth="1.5" opacity=".25" className="da2" />
                <line x1="40" y1="852" x2="600" y2="852" stroke="#00e5ff" strokeWidth="1" opacity=".3" className="da1" />
                <line x1="840" y1="852" x2="1400" y2="852" stroke="#00e5ff" strokeWidth="1" opacity=".3" className="da3" />

                {/* Bottom center diamond */}
                <polygon points="720,862 727,870 720,878 713,870" fill="#00e5ff" opacity=".6" />
                <line x1="420" y1="870" x2="702" y2="870" stroke="#00e5ff" strokeWidth="2" opacity=".45" />
                <line x1="738" y1="870" x2="1020" y2="870" stroke="#00e5ff" strokeWidth="2" opacity=".45" />

                {/* Left vertical */}
                <line x1="24" y1="152" x2="24" y2="800" stroke="#00e5ff" strokeWidth="1.5" opacity=".3" className="da1" />
                <line x1="40" y1="160" x2="40" y2="790" stroke="#00e5ff" strokeWidth="1" opacity=".2" className="da2" />

                {/* Left ticks */}
                {[200, 260, 320, 380, 440, 500, 560, 620, 680, 740, 800].map((y, i) => (
                    <line key={y} x1="24" y1={y} x2={i % 2 === 0 ? 48 : 36} y2={y} stroke="#00e5ff" strokeWidth="1.5" opacity=".4" />
                ))}
                {[200, 320, 440, 560, 680, 800].map(y => (
                    <text key={y} x="54" y={y + 3} fontFamily="'Share Tech Mono',monospace" fontSize="11" fill="#00e5ff" opacity=".4">{y}</text>
                ))}

                {/* Right vertical */}
                <line x1="1416" y1="152" x2="1416" y2="800" stroke="#00e5ff" strokeWidth="1.5" opacity=".3" className="da2" />
                <line x1="1400" y1="160" x2="1400" y2="790" stroke="#00e5ff" strokeWidth="1" opacity=".2" className="da3" />

                {/* Right ticks */}
                {[200, 260, 320, 380, 440, 500, 560, 620, 680, 740, 800].map((y, i) => (
                    <line key={y} x1="1416" y1={y} x2={i % 2 === 0 ? 1392 : 1404} y2={y} stroke="#00e5ff" strokeWidth="1.5" opacity=".4" />
                ))}

                {/* HUD readouts */}
                <g fontFamily="'Share Tech Mono',monospace" fontSize="11" fill="#00e5ff" opacity=".6">
                    <text x="50" y="97">▸ PORTFOLIO_INIT // BUILD_v2.0</text>
                    <circle cx="44" cy="94" r="3" fill="#00e5ff" className="blink" />
                </g>
                <g fontFamily="'Share Tech Mono',monospace" fontSize="11" fill="#00e5ff" opacity=".6" textAnchor="end">
                    <text x="1390" y="97">STATUS:ACTIVE // SYS:ONLINE ◂</text>
                </g>

                {/* Waveform top-right */}
                <g stroke="#00e5ff" strokeWidth="2" opacity=".4">
                    {[0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120].map((dx, i) => {
                        const heights = [8, 14, 6, 18, 10, 12, 5, 16, 9, 13, 7, 15, 8, 11, 6, 14, 10, 17, 8, 12, 5];
                        const h = heights[i % heights.length];
                        const x = 1050 + dx;
                        return <line key={dx} x1={x} y1={90 - h / 2} x2={x} y2={90 + h / 2} />;
                    })}
                </g>

                {/* Bottom-right readout (Sri Lanka Coordinates) */}
                <g fontFamily="'Share Tech Mono',monospace" fontSize="10" fill="#00e5ff" opacity=".5" textAnchor="end">
                    <text x="1392" y="832">LAT: 6.9271° N / LON: 79.8612° E</text>
                    <text x="1392" y="846">▸ 0xFF_READY</text>
                </g>
            </svg>
        </div>
    );
}