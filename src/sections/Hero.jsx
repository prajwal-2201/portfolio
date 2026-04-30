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
  const textRefs     = useRef([]);
  const termRef      = useRef(null);
  const cursorRef    = useRef(null);
  const bgRef        = useRef(null);
  const [lines, setLines] = useState([]);

  // Boot sequence terminal lines
  useEffect(() => {
    const timers = BOOT_SEQUENCE.map(({ delay, text, color }) =>
      setTimeout(() => setLines(prev => [...prev, { text, color }]), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => {
      if (cursorRef.current)
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === '0' ? '1' : '0';
    }, 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background fade-in
      gsap.fromTo(bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' }
      );

      // Main headline reveal — staggered rotateX pop
      gsap.fromTo(textRefs.current,
        { y: 120, opacity: 0, rotateX: -25 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.6, stagger: 0.12,
          ease: 'power4.out', delay: 0.3 }
      );

      // Terminal slides up
      gsap.fromTo(termRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
      );

      // Parallax out on scroll
      gsap.to([...textRefs.current, termRef.current], {
        y: -140,
        opacity: 0,
        scale: 0.92,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="h-screen w-full relative flex flex-col justify-center overflow-hidden bg-[#020202]"
    >
      {/* Radial ambient */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.04),transparent)]" />
        {/* Scan-line overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)', backgroundSize: '100% 3px' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24">

        {/* Glitch-style badge */}
        <div
          ref={el => textRefs.current[0] = el}
          className="overflow-hidden mb-6"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_#22c55e]" />
            System online · Threat analysis active
          </span>
        </div>

        {/* Massive headline */}
        <h1 className="flex flex-col uppercase text-white font-black leading-[0.85] tracking-tighter w-full mb-10">
          <div className="overflow-hidden py-1">
            <span ref={el => textRefs.current[1] = el} className="block text-7xl md:text-[8rem] lg:text-[10rem]">
              Security
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span ref={el => textRefs.current[2] = el} className="block text-7xl md:text-[8rem] lg:text-[10rem] text-white/20">
              Architect
            </span>
          </div>
        </h1>

        {/* Terminal prompt */}
        <div
          ref={termRef}
          className="font-mono text-[11px] md:text-xs space-y-1 max-w-lg"
        >
          {lines.map((line, i) => (
            <div key={i} className={`${line.color} flex items-center gap-2 leading-relaxed`}>
              <span>{line.text}</span>
              {/* Only show cursor on last line */}
              {i === lines.length - 1 && (
                <span ref={cursorRef} className="inline-block w-[7px] h-3.5 bg-current align-middle" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-10 left-6 md:left-24 z-20 flex flex-col gap-2">
        <span className="text-[9px] uppercase tracking-[0.4em] text-slate-600 font-mono">Scroll to initiate</span>
        <div className="w-px h-10 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 animate-[scroll-line_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Top-right coordinate readout */}
      <div className="absolute top-8 right-6 md:right-12 z-20 text-right hidden md:block">
        <p className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
          PRAJWAL_V · DETECTION_ARCHITECT
        </p>
        <p className="text-[9px] font-mono text-slate-700 uppercase tracking-widest mt-1">
          IST +5:30 · REMOTE AVAILABLE
        </p>
      </div>
    </section>
  );
}
