import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Clock, Terminal, FileSignature } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    timestamp: "2024-02-14T08:30:00Z",
    role: "Artifact: Digital Forensics Framework (Frostbyte)",
    source: "MFT Record / System State",
    hash: "a4c2...9f81",
    desc: "Developed a self-contained digital forensics engine in Python to parse and decode binary Windows artifacts natively. Built native parsers for volatile host artifacts to extract system execution timelines and IOCs.",
    bullets: ["Windows Artifact Parsing", "Native Disk Log Processing", "Execution Timeline Extraction"]
  },
  {
    timestamp: "2023-11-05T14:15:22Z",
    role: "Artifact: Next-Gen SOC Platform (Nexus)",
    source: "Network Packet Capture (PCAP)",
    hash: "e3b0...1c14",
    desc: "Engineered a real-time SOC monitoring platform focused on tracking system behavior, log aggregation, and automated incident mapping. Orchestrated pipelines to handle simulated peak loads of 500+ events/sec.",
    bullets: ["500+ EPS Pipeline", "Real-time Telemetry", "Automated Triage"]
  },
  {
    timestamp: "2023-05-22T09:00:45Z",
    role: "Artifact: Static Binary Triage & Anomaly Detection",
    source: "Malware Sample (SHA256: 8f4e...)",
    hash: "d41d...8c39",
    desc: "Spearheaded AegisTriage to digest untrusted file samples and extract hashes/entropy without execution. Co-engineered a PQC Federated Learning framework to detect malicious network anomalies.",
    bullets: ["Static Malware Triage", "Federated Learning", "Byzantine-resilient Models"]
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate line drawing
      gsap.fromTo(lineRef.current,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        }
      );

      // Animate items fading in
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? 50 : -50, rotateY: i % 2 === 0 ? -10 : 10 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="experience" className="py-40 px-6 relative z-10 bg-[#020202] overflow-hidden">
      
      {/* Background data visual */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <div className="flex flex-col gap-4 rotate-12 -translate-y-20 translate-x-40">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="text-[10px] font-mono text-white whitespace-nowrap">
              0x{Math.random().toString(16).slice(2, 10)} 0x{Math.random().toString(16).slice(2, 10)} 0x{Math.random().toString(16).slice(2, 10)} 0x{Math.random().toString(16).slice(2, 10)}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center mb-32">
          <div className="flex items-center gap-2 mb-4">
            <FileSignature size={16} className="text-cyan-600" />
            <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-[0.4em]">Plaso // Log2Timeline</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-light text-white tracking-tighter text-center">
            Chain of <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">Custody</span>
          </h2>
        </div>

        <div className="relative pl-8 md:pl-0 perspective-1000">
          {/* Vertical Line with glowing end */}
          <div className="absolute top-0 left-0 md:left-1/2 w-[1px] h-full bg-cyan-900/30 md:-translate-x-1/2">
            <div ref={lineRef} className="w-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          </div>

          <div className="space-y-32">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                ref={el => itemsRef.current[index] = el}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-24 items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'
                }`}
              >
                {/* Status Indicator Dot */}
                <div className="absolute top-1.5 left-[-33.5px] md:left-1/2 w-2 h-2 rounded-full bg-amber-500 md:-translate-x-1/2 ring-8 ring-[#020202] z-20">
                   <div className="absolute inset-0 bg-amber-400 blur-[4px] opacity-60 animate-pulse" />
                </div>
                
                <div className="md:w-1/2 group">
                  <div className="flex flex-col mb-4 md:items-end group-even:md:items-start text-[10px] font-mono text-slate-500">
                    <span className="text-cyan-500 tracking-widest">{exp.timestamp}</span>
                    <span className="opacity-50">SRC: {exp.source}</span>
                    <span className="opacity-30">MD5: {exp.hash}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
                  
                  <p className="text-slate-400 font-light leading-relaxed max-w-md md:ml-auto group-even:md:ml-0 mb-8 text-sm md:text-base border-l-2 border-cyan-900/50 pl-4 md:pl-0 md:border-l-0 md:border-r-2 md:pr-4 group-even:md:border-r-0 group-even:md:border-l-2 group-even:md:pr-0 group-even:md:pl-4">
                    {exp.desc}
                  </p>

                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.bullets.map((b, bIdx) => (
                      <div 
                        key={bIdx} 
                        className="flex items-center gap-2 px-3 py-1.5 bg-cyan-950/20 border border-cyan-900/30 rounded-lg text-[10px] font-mono text-cyan-600/70 uppercase tracking-widest hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default"
                      >
                        <Terminal size={10} className="opacity-40" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-1/2 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
