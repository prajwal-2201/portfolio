import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BOOT_SEQUENCE = [
  { delay: 600,  text: '> Initiating physical disk acquisition (E01)...',           color: 'text-slate-500' },
  { delay: 900,  text: '> Calculating cryptographic hashes (SHA-256)...',    color: 'text-slate-500' },
  { delay: 1300, text: '> Building forensic timeline...', color: 'text-slate-400' },
  { delay: 1700, text: '> ACQUISITION COMPLETE // INTEGRITY VERIFIED',   color: 'text-cyan-400' },
];

let hasLogged = false;

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef  = useRef(null);
  const termRef      = useRef(null);
  const cursorRef    = useRef(null);
  const bgRef        = useRef(null);
  const scrollHint   = useRef(null);
  const [lines, setLines] = useState([]);
  const [hexDump, setHexDump] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Generate hex dump background
    const hex = [];
    for (let i = 0; i < 400; i++) {
      // Index 96 corresponds roughly to the 9th row, 9th column on a standard 1080p desktop layout
      if (i === 96) {
        // Inject MZ header payload for the easter egg
        hex.push("4D 5A 90 00 03 00 00 00");
      } else {
        hex.push(Array.from({length: 8}, () => Math.floor(Math.random()*256).toString(16).padStart(2, '0').toUpperCase()).join(' '));
      }
    }
    setHexDump(hex);
  }, []);

  useEffect(() => {
    // Easter Egg
    if (!hasLogged) {
      console.log("%c[!] SYSTEM COMPROMISED. \n%cJust kidding. Welcome to the console, investigator. \nTry typing 'root' on the keyboard...", "color: red; font-size: 20px; font-weight: bold;", "color: lime; font-size: 14px;");
      hasLogged = true;
    }

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
      
      {/* Background with hex dump (z-20 so it sits ABOVE the text, but pointer-events-none so it doesn't block) */}
      <div ref={bgRef} className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex flex-wrap gap-x-4 gap-y-2 text-[10px] md:text-xs font-mono opacity-[0.03] select-none p-4 text-white">
        {hexDump.map((hex, i) => (
           i === 96 ? (
             <span key={i} className="text-amber-500/40 animate-pulse hover:text-amber-500 hover:scale-110 cursor-pointer pointer-events-auto transition-all z-50 relative font-bold" onClick={() => setShowModal(true)} title="Analyze Block">{hex}</span>
           ) : (
             <span key={i} className="pointer-events-none">{hex}</span>
           )
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.02)_0%,_transparent_70%)] backdrop-blur-[1px] pointer-events-none" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 pointer-events-none">
        <div className="mb-6 flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] pointer-events-auto w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_#22c55e]" />
          Terminal Session Initialized
        </div>

        {/* Currently Learning Ticker */}
        <div className="mb-6 overflow-hidden whitespace-nowrap border-l-2 border-amber-500/30 pl-4 py-1 pointer-events-auto w-fit max-w-full">
          <span className="text-[9px] font-mono text-amber-600/60 uppercase tracking-[0.3em] mr-4">Now Studying →</span>
          <span className="inline-block animate-[marquee_18s_linear_infinite] text-[9px] font-mono text-amber-500/50 tracking-widest">
            Volatility 3 · Memory Forensics &nbsp;&nbsp;|&nbsp;&nbsp; GCFE Prep · GIAC Forensics &nbsp;&nbsp;|&nbsp;&nbsp; Advanced MFT Parsing &nbsp;&nbsp;|&nbsp;&nbsp; Linux Forensics with Plaso &nbsp;&nbsp;|&nbsp;&nbsp; ELK Stack Forensic Pipelines &nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
        </div>

        <h1 ref={headlineRef} className="flex flex-col uppercase text-white font-black leading-[0.85] tracking-tighter w-full mb-12 pointer-events-auto">
          <div className="overflow-hidden py-1"><span className="block text-4xl sm:text-5xl md:text-[6rem] lg:text-[7rem]">Digital Forensics &</span></div>
          <div className="overflow-hidden py-1"><span className="block text-4xl sm:text-5xl md:text-[6rem] lg:text-[7rem] text-white/10">Incident Responder</span></div>
        </h1>

        <div ref={termRef} className="font-mono text-[11px] md:text-xs space-y-1.5 max-w-lg opacity-0 pointer-events-auto">
          {lines.map((l, i) => (
            <div key={i} className={`${l.color} flex items-center gap-2`}>
              <span>{l.msg}</span>
              {i === lines.length - 1 && <span ref={cursorRef} className="w-1.5 h-3 bg-current animate-pulse" />}
            </div>
          ))}
          {lines.length === 0 && <span className="text-slate-600 tracking-widest animate-pulse">BOOTING...</span>}
        </div>
        {/* Fixed coordinates readout */}
        <div className="absolute top-10 right-10 hidden lg:block text-right z-50 pointer-events-auto">
          <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] cursor-pointer hover:text-red-500 transition-colors" onClick={() => alert('Access Denied: Level 5 Clearance Required.')}>PV_PROTOCOL v8.4.7</p>
          <p className="text-[9px] font-mono text-white/10 uppercase tracking-[0.3em] mt-1">STATUS: OPERATIONAL</p>
        </div>
      </div>

      {/* Scroll Hint */}
      <div ref={scrollHint} className="absolute bottom-12 left-6 md:left-24 z-20 flex flex-col gap-3">
        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em]">Initiate Sequence</span>
        <div className="w-px h-16 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 animate-[scroll-line_2s_infinite]" />
        </div>
      </div>

      {/* Hex Decoder Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm pointer-events-auto">
          <div className="bg-[#050505] border-2 border-amber-500/50 p-8 rounded-xl max-w-lg w-full shadow-[0_0_50px_rgba(245,158,11,0.2)]">
            <h3 className="text-2xl font-bold text-amber-500 mb-2 uppercase tracking-widest">Payload Decoded</h3>
            <p className="text-sm font-mono text-slate-400 mb-6 leading-relaxed">
              &gt; Magic bytes 4D 5A (MZ) identified.<br/>
              &gt; Executable header carved from memory.<br/>
              &gt; Target extracted: <b>Prajwal_V_Resume.pdf</b>
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="px-6 py-2 border border-white/20 text-slate-300 text-xs font-mono uppercase tracking-widest rounded hover:bg-white/5 transition-colors">
                Ignore
              </button>
              <a href="/Prajwal_resume.pdf" target="_blank" onClick={() => setShowModal(false)} className="px-6 py-2 bg-amber-500/10 border border-amber-500 text-amber-500 text-xs font-mono uppercase tracking-widest rounded hover:bg-amber-500/20 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
