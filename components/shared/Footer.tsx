export default function Footer() {
    return (
        <footer className="w-full border-t border-cyan-500/20 bg-[#050a0f] relative overflow-hidden">

            {/* Subtle glowing power-line at the very top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 md:w-1/3 h-px bg-linear-to-r from-transparent via-cyan-400/80 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[3px] bg-cyan-400/50 blur-sm" />

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center text-center">

                {/* Blinking Status Indicator */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#00e5ff]" />
                    <p className="text-cyan-500/50 text-[10px] tracking-[0.3em] font-mono uppercase">
                        SYS_PROCESS // TERMINATING...
                    </p>
                </div>

                {/* Main Name */}
                <h2
                    className="text-2xl md:text-3xl text-gray-200 font-bold tracking-[0.2em] uppercase mb-3"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                    NIWANTHA <span className="text-cyan-400">SANJULA</span>
                </h2>

                {/* Cyberpunk Tagline Badge */}
                <div className="border border-cyan-500/30 bg-cyan-950/30 px-5 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.05)] mb-10">
                    <p className="text-cyan-300 text-xs tracking-widest uppercase font-mono">
                        Software Engineer <span className="text-cyan-500/50 mx-2">||</span> AI & ML Researcher
                    </p>
                </div>

                {/* Bottom Status Bar (EOF) */}
                <div className="w-full flex items-center justify-between text-[10px] text-cyan-500/40 font-mono border-t border-cyan-500/10 pt-6">
                    <p className="hidden md:block tracking-widest">VER // 2.0.26</p>

                    <p className="tracking-widest mx-auto md:mx-0">
                        &copy; {new Date().getFullYear()} NIWANTHA. ALL_RIGHTS_RESERVED.
                    </p>

                    <p className="hidden md:block tracking-widest text-cyan-500/60">
                        &lt;EOF/&gt;
                    </p>
                </div>

            </div>
        </footer>
    );
}