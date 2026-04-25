import { Terminal, Shield, Lock, Activity, ChevronRight, Zap, Target, Cpu } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* HUD Elements - Animated via CSS */}
      <div className="absolute top-10 left-10 hidden xl:block opacity-50 hover:opacity-100 transition-opacity">
        <div className="flex flex-col gap-2 border-l border-neon-blue/20 pl-4 py-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-neon-blue">
            <Activity size={12} className="animate-pulse" /> SYSTEM_STATUS: OPERATIONAL
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-neon-green">
            <Lock size={12} /> SEC_CLEARANCE: LEVEL_4
          </div>
          <div className="text-[8px] font-mono text-slate-600 mt-2 uppercase tracking-widest">Tracing_Origin: 127.0.0.1</div>
        </div>
      </div>

      <div className="absolute top-10 right-10 hidden xl:block opacity-50 hover:opacity-100 transition-opacity">
        <div className="text-right border-r border-white/10 pr-4 py-2">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Target_Acquisition</div>
          <div className="text-lg font-bold text-white font-mono tracking-tighter">SECURE_ARCHITECTURES</div>
          <div className="flex items-center justify-end gap-1 mt-1">
            <div className="w-1 h-1 bg-neon-blue" />
            <div className="w-1 h-1 bg-neon-blue/40" />
            <div className="w-1 h-1 bg-neon-blue/10" />
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-[10px] font-mono mb-8 uppercase tracking-[0.2em] glow-text-blue animate-pulse">
          <Terminal size={12} /> System_Initialization // Operator: Prajwal_V
        </div>

        <h1 className="text-4xl md:text-8xl font-black mb-8 leading-tight tracking-tighter text-white uppercase terminal-text">
          Building <span className="relative inline-block">
            <span className="relative z-10 text-neon-blue">Resilient</span>
            <span className="absolute bottom-2 left-0 w-full h-4 bg-neon-blue/10 -z-10" />
          </span><br />
          Defensive Systems
        </h1>

        <div className="mb-12 relative inline-block group">
          <div className="absolute -inset-4 bg-neon-blue/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative glass-panel px-6 md:px-8 py-5 md:py-6 border-l-4 border-l-neon-blue rounded-none hud-border bg-black/40 hover:bg-black/60 transition-all duration-300 transform hover:-translate-y-1">
            <p className="text-lg md:text-3xl text-slate-100 font-mono tracking-tight leading-tight">
              Cybersecurity-focused engineer building<br className="hidden md:block" />
              <span className="text-neon-blue font-bold ml-2 md:ml-0">real-world defensive tools</span> and secure architectures.
            </p>
          </div>
        </div>

        <p className="text-xs md:text-lg text-slate-500 max-w-2xl mx-auto mb-12 font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed px-4 md:px-0">
          Specializing in threat detection, SOC pipelines, <br /> and kernel-level process isolation.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <a
            href="#missions"
            className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 hover:bg-neon-blue transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)]"
          >
            Access_Missions
            <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
          <a
            href="#contact"
            className="group px-12 py-6 bg-transparent border border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 hover:bg-white/5 transition-all duration-300 hover:border-white/40"
          >
            Establish_Contact
            <Zap size={18} className="text-neon-blue group-hover:scale-125 transition-transform" />
          </a>
        </div>
      </div>

      {/* Background visual - Grid interaction feel */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.05]">
        <div className="text-[25vw] font-black font-mono leading-none whitespace-nowrap -mb-20 tracking-tighter hover:text-neon-blue transition-colors duration-1000">
          SECURE_OPERATIONS
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group cursor-pointer" onClick={() => document.getElementById('journey').scrollIntoView({ behavior: 'smooth' })}>
        <span className="text-[8px] font-mono text-slate-600 tracking-[0.4em] uppercase group-hover:text-neon-blue transition-colors">Initialize_Sequence</span>
        <div className="w-px h-16 bg-gradient-to-b from-neon-blue to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
