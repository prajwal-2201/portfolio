import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, Terminal, Lock, Activity, Eye, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SignatureScene() {
  const containerRef = useRef(null);
  const triggerRef   = useRef(null);
  const terminalRef  = useRef(null);
  const alertRef     = useRef(null);
  const revealRef    = useRef(null);
  const overlayRef   = useRef(null);
  
  const [logs, setLogs] = useState([
    { t: "[04:12:01]", msg: "Initializing Deep Packet Inspection..." },
    { t: "[04:12:03]", msg: "Scanning memory for malicious segments..." },
    { t: "[04:12:05]", msg: "System integrity: UNSTABLE" },
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
          snap: {
            snapTo: [0, 0.3, 0.7, 1],
            duration: 0.5,
            delay: 0.1,
            ease: "power2.inOut"
          }
        }
      });

      // 1. Initial State: Fade to total black
      tl.to(overlayRef.current, { opacity: 1, duration: 1 });

      // 2. Terminal Emergence
      tl.fromTo(terminalRef.current, 
        { y: 100, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.5 }
      );

      // 3. THREAT DETECTED Flash
      tl.fromTo(alertRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
      
      // Pulse effect while pinned
      tl.to(alertRef.current, { 
        backgroundColor: "rgba(220, 38, 38, 0.4)", 
        repeat: 3, 
        yoyo: true, 
        duration: 0.2 
      }, ">-0.5");

      // 4. Reveal the Core (Project/Architecture)
      tl.to([terminalRef.current, alertRef.current], { 
        y: -100, 
        opacity: 0, 
        scale: 0.8, 
        duration: 1, 
        stagger: 0.2 
      });

      tl.fromTo(revealRef.current,
        { y: 200, opacity: 0, scale: 0.5, rotateX: 45 },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 2, ease: "power4.out" }
      );

      // 5. Final cinematic hold
      tl.to(revealRef.current, { y: -20, duration: 2, ease: "none" });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Background Trigger Area */}
      <div ref={triggerRef} className="h-screen w-full relative overflow-hidden bg-[#020202]">
        
        {/* Cinematic Overlay - controlled by scroll */}
        <div ref={overlayRef} className="absolute inset-0 bg-black z-10 opacity-0 pointer-events-none" />

        {/* Scanlines / Noise */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
             style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,white 2px,white 3px)' }} />

        {/* SCENE 1: The Terminal (Analysis) */}
        <div ref={terminalRef} className="absolute inset-0 z-30 flex items-center justify-center p-6 opacity-0">
          <div className="w-full max-w-3xl bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)]">
            <div className="px-5 py-3 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">nexus_core // kernel_analysis</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-2 h-2 rounded-full bg-slate-800" />
              </div>
            </div>
            <div className="p-8 font-mono text-xs md:text-sm space-y-2 leading-relaxed text-slate-400">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-slate-600">{log.t}</span>
                  <span>{log.msg}</span>
                </div>
              ))}
              <div className="flex gap-4 animate-pulse">
                <span className="text-slate-600">[........]</span>
                <span className="text-white">Analyzing heuristic patterns...</span>
              </div>
            </div>
          </div>
        </div>

        {/* SCENE 2: THREAT ALERT */}
        <div ref={alertRef} className="absolute inset-0 z-40 flex items-center justify-center p-6 pointer-events-none opacity-0">
          <div className="px-12 py-8 bg-red-600/20 border-2 border-red-500 rounded-2xl backdrop-blur-xl shadow-[0_0_100px_rgba(239,68,68,0.3)] flex flex-col items-center">
            <ShieldAlert size={80} className="text-red-500 mb-6 animate-bounce" />
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">Threat Detected</h3>
            <p className="text-red-400 font-mono text-sm uppercase tracking-[0.3em]">Critical Memory Corruption · APT29 Pattern Match</p>
          </div>
        </div>

        {/* SCENE 3: THE REVEAL (Nexus Platform) */}
        <div ref={revealRef} className="absolute inset-0 z-50 flex items-center justify-center p-6 opacity-0">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-3xl blur-3xl group-hover:bg-white/10 transition-colors" />
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <Activity size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white tracking-tight">Nexus Alpha</h4>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Autonomous Detection Engine</p>
                  </div>
                </div>
                <div className="space-y-4 mb-10">
                   {[1,2,3].map(i => (
                     <div key={i} className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full bg-white/20 rounded-full animate-[loading_2s_ease-in-out_infinite]`} style={{ width: `${30 * i}%`, animationDelay: `${i * 0.2}s` }} />
                     </div>
                   ))}
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                   <div className="flex gap-3">
                      <div className="w-10 h-10 rounded bg-white/5 border border-white/10" />
                      <div className="w-10 h-10 rounded bg-white/5 border border-white/10" />
                   </div>
                   <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">System Purified</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                Engineering <br /> <span className="text-white/20">The Countermeasure</span>
              </h4>
              <p className="text-slate-400 font-light text-lg leading-relaxed">
                When the signature fails, the heuristic engine takes over. Nexus Alpha is my answer to persistent threats — an automated response layer that isolates compromises in milliseconds.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/prajwal-2201/Nexus#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                >
                  Deep Dive Docs
                </a>
                <a 
                  href="https://github.com/prajwal-2201/Nexus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-colors"
                >
                  View Architecture
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
