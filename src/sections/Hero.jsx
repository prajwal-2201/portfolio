import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BOOT_SEQUENCE = [
  { delay: 600,  text: '> initializing nexus_core.py',           color: 'text-slate-500' },
  { delay: 900,  text: '> loading threat_detection_engine...',    color: 'text-slate-500' },
  { delay: 1300, text: '> correlation rules loaded: 847',         color: 'text-slate-400' },
  { delay: 1700, text: '> SYSTEM ONLINE // ALL SENSORS ACTIVE',   color: 'text-green-400' },
];

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef  = useRef(null);
  const termRef      = useRef(null);
  const cursorRef    = useRef(null);
  const bgRef        = useRef(null);
  const scrollHint   = useRef(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const timers = BOOT_SEQUENCE.map(({ delay, text, color }) =>
      setTimeout(() => setLines(prev => [...prev, { text, color }]), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      gsap.fromTo(bgRef.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 2.5 });
      gsap.fromTo(headlineRef.current.children, 
        { y: 150, rotateX: -45, opacity: 0 }, 
        { y: 0, rotateX: 0, opacity: 1, duration: 1.8, stagger: 0.15, ease: "power4.out", delay: 0.5 }
      );
      gsap.fromTo(termRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.5 });
      gsap.fromTo(scrollHint.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 3 });

      // PINNED SCROLL SCRUB
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1,
        }
      });

      tl.to(headlineRef.current, { scale: 0.8, opacity: 0, y: -100, duration: 1 }, 0)
        .to(termRef.current, { opacity: 0, scale: 0.9, y: -50, duration: 1 }, 0.2)
        .to(scrollHint.current, { opacity: 0, duration: 0.5 }, 0)
        .to(bgRef.current, { scale: 1.2, opacity: 0, duration: 1 }, 0);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full relative flex flex-col justify-center bg-[#020202] overflow-hidden">
      
      {/* Background with scanlines */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)', backgroundSize: '100% 3px' }} />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <div className="mb-6 flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_#22c55e]" />
          Terminal Session Initialized
        </div>

        <h1 ref={headlineRef} className="flex flex-col uppercase text-white font-black leading-[0.85] tracking-tighter w-full mb-12">
          <div className="overflow-hidden py-1"><span className="block text-7xl md:text-[8rem] lg:text-[10rem]">Security</span></div>
          <div className="overflow-hidden py-1"><span className="block text-7xl md:text-[8rem] lg:text-[10rem] text-white/10">Architect</span></div>
        </h1>

        <div ref={termRef} className="font-mono text-[11px] md:text-xs space-y-1.5 max-w-lg opacity-0">
          {lines.map((l, i) => (
            <div key={i} className={`${l.color} flex items-center gap-2`}>
              <span>{l.msg}</span>
              {i === lines.length - 1 && <span ref={cursorRef} className="w-1.5 h-3 bg-current animate-pulse" />}
            </div>
          ))}
          {lines.length === 0 && <span className="text-slate-600 tracking-widest animate-pulse">BOOTING...</span>}
        </div>
      </div>

      {/* Scroll Hint */}
      <div ref={scrollHint} className="absolute bottom-12 left-6 md:left-24 z-20 flex flex-col gap-3">
        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em]">Initiate Sequence</span>
        <div className="w-px h-16 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 animate-[scroll-line_2s_infinite]" />
        </div>
      </div>

      {/* Fixed coordinates readout */}
      <div className="absolute top-10 right-10 hidden lg:block text-right">
        <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">PV_PROTOCOL v8.4.7</p>
        <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em] mt-1">STATUS: OPERATIONAL</p>
      </div>
    </section>
  );
}
