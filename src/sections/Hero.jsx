import { Terminal, Shield, Lock, Activity, ChevronRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* HUD Elements */}
      <div className="absolute top-10 left-10 hidden xl:block">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-neon-blue/40">
            <Activity size={12} /> SYSTEM_STATUS: OPERATIONAL
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-neon-green/40">
            <Lock size={12} /> SEC_CLEARANCE: LEVEL_4
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-10 hidden xl:block">
        <div className="text-right">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Deployment Phase</div>
          <div className="text-lg font-bold text-white font-mono tracking-tighter">PHASE_04_STABLE</div>
        </div>
      </div>

      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-[10px] font-mono mb-8 uppercase tracking-widest glow-text-blue">
          <Terminal size={12} /> Identity_Verified // SOC_ENGINEER
        </div>

        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter text-white uppercase terminal-text">
          Cybersecurity<br />
          <span className="text-neon-blue">Engineer</span>
        </h1>

        <div className="mb-12 relative inline-block">
          <div className="absolute -inset-1 bg-neon-blue/20 blur-xl rounded-full" />
          <div className="relative glass-panel px-6 py-4 border-l-4 border-l-neon-blue rounded-none hud-border">
            <p className="text-xl md:text-2xl text-slate-100 font-mono tracking-tight leading-relaxed">
              I build systems that <span className="text-neon-blue font-bold italic underline decoration-neon-blue/30 underline-offset-4">detect</span> and <span className="text-neon-red font-bold italic underline decoration-neon-red/30 underline-offset-4">respond</span> to<br className="hidden md:block" /> real-world cyber threats.
            </p>
          </div>
        </div>

        <p className="text-sm md:text-lg text-slate-500 max-w-2xl mx-auto mb-12 font-mono uppercase tracking-[0.2em]">
          Focused on threat detection, incident response, and defensive engineering.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a
            href="#missions"
            className="group relative px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-neon-blue transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_#00f0ff]"
          >
            Access_Missions
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-10 py-5 bg-transparent border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white/5 transition-all duration-300"
          >
            Establish_Contact
          </a>
        </div>
      </div>

      {/* Background visual - Large subtle text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.03]">
        <div className="text-[20vw] font-black font-mono leading-none whitespace-nowrap -mb-10">
          DEFENSE // DETECTION // RESPONSE
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[8px] font-mono text-slate-600 tracking-[0.3em] uppercase">Scroll_To_Observe</span>
        <div className="w-px h-12 bg-gradient-to-b from-neon-blue/20 to-transparent" />
      </div>
    </section>
  );
}
