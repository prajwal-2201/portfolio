import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Fingerprint, ShieldAlert, Cpu, Unlock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const profileRef = useRef(null);
  const [isDecoded, setIsDecoded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Re-enable GSAP animation but applied to a wrapper to avoid destroying our spans
      gsap.fromTo(textRef.current, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        }
      });

      gsap.fromTo(profileRef.current, 
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 40%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-40 px-6 relative z-10 bg-[#020202] flex items-center justify-center min-h-screen overflow-hidden">
      
      {/* Background ID visual */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none hidden lg:block">
        <Fingerprint size={600} strokeWidth={0.5} className="text-white" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center relative z-10">
        
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <ShieldAlert size={18} className="text-white/60" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">Strategic Directive</span>
          </div>
          
          <div className="relative group">
            <h2 
              ref={textRef} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white uppercase"
            >
              I DON'T JUST ANALYZE LOGS. I{' '}
              <span className="bg-black text-black hover:text-white hover:bg-transparent transition-colors duration-500 px-2 cursor-crosshair">RECONSTRUCT THE TRUTH</span>. I BUILD{' '}
              <span className="bg-black text-black hover:text-white hover:bg-transparent transition-colors duration-500 px-2 cursor-crosshair">AUTOMATED FORENSIC ENGINES</span> THAT UNCOVER{' '}
              <span className="bg-black text-black hover:text-white hover:bg-transparent transition-colors duration-500 px-2 cursor-crosshair">HIDDEN THREATS</span> AND ACCELERATE INCIDENT RESPONSE.
            </h2>
            <span className="absolute -bottom-12 left-0 text-[10px] font-mono text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
              &gt; Redacted payload revealed.
            </span>
          </div>
        </div>

        <div ref={profileRef} className="lg:col-span-4 bg-[#050505] border border-white/[0.05] rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.05]">
            <Cpu size={120} />
          </div>
          
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-6 border-b border-white/5 pb-4">Operator Profile</h3>
          
          {/* Steganography Image Box */}
          <div className="mb-8 group flex flex-col items-center">
             <div className={`w-32 h-32 rounded-lg mb-4 overflow-hidden border border-white/10 relative transition-all duration-1000 ${isDecoded ? 'shadow-[0_0_20px_rgba(6,182,212,0.5)]' : ''}`}>
                <div 
                   className="absolute inset-0 transition-opacity duration-1000"
                   style={{
                     backgroundImage: isDecoded ? 'url("/IMG_20260127_212415_680.webp")' : 'repeating-linear-gradient(45deg, #000, #000 2px, #333 2px, #333 4px)',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     opacity: isDecoded ? 1 : 0.8
                   }}
                />
                {!isDecoded && <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-50 animate-pulse" />}
             </div>
             <button 
                onClick={() => setIsDecoded(true)}
                disabled={isDecoded}
                className={`text-[9px] font-mono uppercase tracking-[0.3em] px-4 py-2 border rounded-full transition-all flex items-center gap-2 ${isDecoded ? 'border-cyan-500/50 text-cyan-500 cursor-default' : 'border-slate-700 text-slate-400 hover:text-white hover:border-white/50 cursor-pointer'}`}
             >
                {isDecoded ? <><Unlock size={10} /> Data Extracted</> : 'Extract LSB Data'}
             </button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Specialization</span>
              <span className="text-sm text-white font-medium">DFIR & Security Automation</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Core Narrative</span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Transforming raw network telemetry and host logs into actionable security intelligence. Focused on digital forensics, automated triage, and threat isolation.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-xs text-cyan-500 font-mono uppercase tracking-widest">Active Search</span>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex items-center gap-3 text-[9px] font-mono text-slate-700">
            <span>ID: PV_847_NX</span>
            <span className="opacity-20">|</span>
            <span>VERIFIED: 2025</span>
          </div>
        </div>

      </div>
    </section>
  );
}
