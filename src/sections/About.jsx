import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Fingerprint, ShieldAlert, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = textRef.current.innerText.split("");
      textRef.current.innerHTML = "";
      
      chars.forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.opacity = 0.05;
        textRef.current.appendChild(span);
      });

      gsap.to(textRef.current.children, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
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
          
          <h2 
            ref={textRef} 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white uppercase"
          >
            I DON'T JUST FIND VULNERABILITIES. I ARCHITECT RESILIENCE. I BUILD AUTOMATED DEFENSES THAT ELIMINATE THREATS BEFORE THEY COMPROMISE THE SYSTEM.
          </h2>
        </div>

        <div ref={profileRef} className="lg:col-span-4 bg-[#050505] border border-white/[0.05] rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.05]">
            <Cpu size={120} />
          </div>
          
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-4">Operator Profile</h3>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Specialization</span>
              <span className="text-sm text-white font-medium">Detection Engineering</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Core Narrative</span>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                Bridging the gap between raw telemetry and actionable intelligence. Focused on high-fidelity detection logic and autonomous incident reconstruction.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-white font-mono uppercase tracking-widest">Active Search</span>
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
