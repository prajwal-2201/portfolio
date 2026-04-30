import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

      // Animate items fading in
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="experience" className="py-32 px-6 relative z-10 bg-[#020202]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-20 text-center">
          Operational <span className="font-medium">Timeline</span>
        </h2>

        <div className="relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute top-0 left-0 md:left-1/2 w-[1px] h-full bg-white/5 md:-translate-x-1/2">
            <div ref={lineRef} className="w-full bg-white" />
          </div>

          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                ref={el => itemsRef.current[index] = el}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'
                }`}
              >
                {/* Dot */}
                <div className="absolute top-0 left-[-33px] md:left-1/2 w-2 h-2 rounded-full bg-white md:-translate-x-1/2 ring-4 ring-[#020202]" />
                
                <div className="md:w-1/2">
                  <div className="text-xs font-mono text-slate-500 tracking-widest mb-2">{exp.year}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                  <div className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-4">{exp.company}</div>
                  <p className="text-slate-500 font-light leading-relaxed max-w-sm md:ml-auto mb-4">
                    {exp.desc}
                  </p>
                  {exp.bullets && (
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.bullets.map((b, bIdx) => (
                        <span key={bIdx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-slate-300 uppercase tracking-wider">
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
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
