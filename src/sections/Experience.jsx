import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Clock, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: "2024 – PRESENT",
    role: "SOC Engineer & Detection Architect",
    company: "Freelance / Open Source",
    desc: "Engineering automated threat detection pipelines capable of processing 15,000+ EPS with a 45% false-positive reduction. Built a full incident reconstruction platform from the ground up with a real-time React dashboard.",
    bullets: ["15K+ EPS pipeline throughput", "45% drop in false positive alerts", "Full-stack SIEM + IR dashboard"]
  },
  {
    year: "2023 – 2024",
    role: "Digital Forensics Researcher",
    company: "Independent Research",
    desc: "Developed raw disk I/O parsers and deep OS artifact analyzers to recover compromised tracks with a 98% recovery success rate on heavily fragmented drives. Researched anti-forensic evasion techniques used by APT actors.",
    bullets: ["98% artifact recovery rate", "Anti-forensic evasion research", "NTFS/FAT raw parser (custom-built)"]
  },
  {
    year: "2022 – 2023",
    role: "Security Analyst",
    company: "Academic & Lab Environment",
    desc: "Conducted end-to-end vulnerability assessments across 20+ target systems. Performed network pentests and designed cryptographic protocol implementations as part of structured academic and self-led lab exercises.",
    bullets: ["20+ systems assessed", "Offensive & defensive tooling", "Cryptography protocol design"]
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

      // Animate items fading in with a slight rotation for "experience factor"
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
            <Clock size={16} className="text-slate-600" />
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em]">Operational Log</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-light text-white tracking-tighter text-center">
            Service <span className="font-medium">History</span>
          </h2>
        </div>

        <div className="relative pl-8 md:pl-0 perspective-1000">
          {/* Vertical Line with glowing end */}
          <div className="absolute top-0 left-0 md:left-1/2 w-[1px] h-full bg-white/5 md:-translate-x-1/2">
            <div ref={lineRef} className="w-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
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
                <div className="absolute top-1.5 left-[-33.5px] md:left-1/2 w-2 h-2 rounded-full bg-white md:-translate-x-1/2 ring-8 ring-[#020202] z-20">
                   <div className="absolute inset-0 bg-white blur-[4px] opacity-40 animate-pulse" />
                </div>
                
                <div className="md:w-1/2 group">
                  <div className="flex items-center gap-3 mb-4 md:justify-end group-even:md:justify-start">
                    <span className="text-[10px] font-mono text-slate-500 tracking-widest">{exp.year}</span>
                    <Activity size={12} className="text-white/20" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">{exp.role}</h3>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-[0.2em] mb-8">{exp.company}</div>
                  
                  <p className="text-slate-400 font-light leading-relaxed max-w-md md:ml-auto group-even:md:ml-0 mb-8 text-sm md:text-base">
                    {exp.desc}
                  </p>

                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.bullets.map((b, bIdx) => (
                      <div 
                        key={bIdx} 
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg text-[10px] font-mono text-slate-400 uppercase tracking-widest hover:border-white/20 transition-all cursor-default"
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
