import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Fingerprint, FileDigit } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SignatureScene() {
  const containerRef = useRef(null);
  const triggerRef   = useRef(null);
  const hexRef       = useRef(null);
  const alertRef     = useRef(null);
  const revealRef    = useRef(null);
  const overlayRef   = useRef(null);
  const scannerRef   = useRef(null);
  
  const [hexData, setHexData] = useState([]);

  useEffect(() => {
    // Generate hex data for the analyzer
    const data = [];
    for(let i = 0; i < 20; i++) {
      const offset = (i * 16).toString(16).padStart(8, '0');
      const hexLine = Array.from({length: 16}, () => Math.floor(Math.random()*256).toString(16).padStart(2, '0').toUpperCase()).join(' ');
      data.push({ offset, hex: hexLine });
    }
    // Inject our payload in the middle
    data[10].hex = "4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00"; // MZ header
    setHexData(data);
  }, []);

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

      // 2. Hex Analyzer Emergence
      tl.fromTo(hexRef.current, 
        { y: 100, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.5 }
      );

      // Scanning animation
      tl.to(scannerRef.current, { y: 200, duration: 2, ease: "none" }, "<");

      // 3. Artifact Alert Flash
      tl.fromTo(alertRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
      
      // Pulse effect while pinned (Amber color)
      tl.to(alertRef.current, { 
        backgroundColor: "rgba(245, 158, 11, 0.4)", // Amber-500
        repeat: 3, 
        yoyo: true, 
        duration: 0.2 
      }, ">-0.5");

      // 4. Reveal the Core (Project/Architecture)
      tl.to([hexRef.current, alertRef.current], { 
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
      <div ref={triggerRef} className="h-screen w-full relative overflow-hidden bg-[#020202]">
        
        <div ref={overlayRef} className="absolute inset-0 bg-black z-10 opacity-0 pointer-events-none" />

        {/* Minimal grid background */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* SCENE 1: The Hex Analyzer */}
        <div ref={hexRef} className="absolute inset-0 z-30 flex items-center justify-center p-6 opacity-0">
          <div className="w-full max-w-4xl bg-[#050505] border border-cyan-900/30 rounded-xl overflow-hidden shadow-[0_0_100px_rgba(8,145,178,0.2)] relative">
            <div className="px-5 py-3 border-b border-cyan-900/30 bg-cyan-950/20 flex justify-between items-center">
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">ftk_imager // memory_dump.raw</span>
              <FileDigit size={16} className="text-cyan-500" />
            </div>
            <div className="p-8 font-mono text-[10px] md:text-xs space-y-1 leading-relaxed text-cyan-900 relative h-[300px] overflow-hidden">
              <div ref={scannerRef} className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-cyan-500/20 border-b border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] z-10" />
              {hexData.map((line, i) => (
                <div key={i} className={`flex gap-4 ${i === 10 ? 'text-amber-500 font-bold' : ''}`}>
                  <span className="text-slate-600 select-none">{line.offset}</span>
                  <span className="tracking-widest">{line.hex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SCENE 2: ARTIFACT RECOVERED ALERT */}
        <div ref={alertRef} className="absolute inset-0 z-40 flex items-center justify-center p-6 pointer-events-none opacity-0">
          <div className="px-12 py-8 bg-amber-600/20 border-2 border-amber-500 rounded-2xl backdrop-blur-xl shadow-[0_0_100px_rgba(245,158,11,0.3)] flex flex-col items-center">
            <Fingerprint size={80} className="text-amber-500 mb-6 animate-pulse" />
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">Artifact Recovered</h3>
            <p className="text-amber-400 font-mono text-sm uppercase tracking-[0.3em]">Magic Byte Mismatch · Payload Carved</p>
          </div>
        </div>

        {/* SCENE 3: THE REVEAL (Evidence Dashboard) */}
        <div ref={revealRef} className="absolute inset-0 z-50 flex items-center justify-center p-6 opacity-0">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-900/20 rounded-3xl blur-3xl group-hover:bg-cyan-900/30 transition-colors" />
              <div className="relative bg-[#050505] border border-cyan-900/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-cyan-950/50 rounded-xl border border-cyan-900/50">
                    <Database size={32} className="text-cyan-500" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white tracking-tight">DeepTrace</h4>
                    <p className="text-[10px] font-mono text-cyan-600 uppercase tracking-widest">Advanced Forensic Framework</p>
                  </div>
                </div>
                <div className="space-y-4 mb-10">
                   {[1,2,3].map(i => (
                     <div key={i} className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className={`h-full bg-cyan-500 rounded-full animate-[loading_2s_ease-in-out_infinite]`} style={{ width: `${30 * i}%`, animationDelay: `${i * 0.2}s` }} />
                     </div>
                   ))}
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-cyan-900/30">
                   <div className="flex gap-3">
                      <div className="flex flex-col">
                         <span className="text-[8px] font-mono text-slate-500 uppercase">SHA-256</span>
                         <span className="text-[10px] font-mono text-cyan-500">e3b0c44298fc1c14</span>
                      </div>
                   </div>
                   <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">Chain of Custody Secured</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                Reconstructing <br /> <span className="text-cyan-500/50">The Digital Timeline</span>
              </h4>
              <p className="text-slate-400 font-light text-lg leading-relaxed">
                When standard tools fail, custom forensic parsers take over. DeepTrace is my answer to advanced evasion — a comprehensive engine that recovers deleted artifacts, verifies cryptographic hashes, and exposes hidden truths.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/prajwal-2201/DeepTrace#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-cyan-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-cyan-500 transition-colors"
                >
                  Deep Dive Docs
                </a>
                <a 
                  href="https://github.com/prajwal-2201/DeepTrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-cyan-900/50 text-cyan-500 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-cyan-950/30 transition-colors"
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
