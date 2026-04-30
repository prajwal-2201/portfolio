import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, Target, Database, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const missions = [
  {
    id: "OP-01",
    layer: "Infrastructure & Orchestration",
    title: "Nexus Threat Platform",
    tagline: "Real-time SOC Pipeline · FastAPI / WebSockets",
    desc: "Processes 15,000+ EPS through a live WebSocket pipeline. Custom correlation rules cut false positive alerts by 45% — directly reducing analyst alert fatigue and freeing the team to focus on critical P1 incidents rather than noise.",
    impact: "Reduced P1 response time by eliminating low-fidelity noise at the ingestion layer.",
    tech: ["Python", "FastAPI", "WebSockets", "Elasticsearch", "React", "Docker"],
    link: "https://github.com/prajwal-2201/Nexus",
    caseStudy: "https://github.com/prajwal-2201/Nexus#readme",
    stats: { throughput: "15K+ EPS", efficiency: "+45%", status: "OPERATIONAL" }
  },
  {
    id: "OP-02",
    layer: "Detection Engineering & Logic",
    title: "CyberSentinel DFIR",
    tagline: "Digital Forensics & Incident Response · YARA / Sigma",
    desc: "A forensic analysis engine built to defeat anti-forensic evasion. Parses raw NTFS/FAT structures at the sector level to recover hidden streams and deleted artifacts — achieving a 98% recovery success rate on heavily fragmented drives.",
    impact: "Enables attribution analysis by recovering attacker-wiped execution artefacts.",
    tech: ["C++", "WinAPI", "YARA", "Raw I/O", "Python"],
    link: "https://github.com/prajwal-2201/CyberSentinel",
    caseStudy: "https://github.com/prajwal-2201/CyberSentinel#readme",
    stats: { recovery: "98% Rate", depth: "Sector Level", status: "STABLE" }
  }
];

export default function Featured() {
  const sectionRef = useRef(null);
  const scrollRef  = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(scrollRef.current.scrollWidth - window.innerWidth);
      const tween = gsap.to(scrollRef.current, { x: getScrollAmount, ease: "none" });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="h-screen bg-[#020202] relative overflow-hidden flex flex-col justify-center border-t border-white/5"
    >
      {/* Background Mission Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Top Section label */}
      <div className="absolute top-16 left-10 md:left-20 z-20">
        <div className="flex items-center gap-3 mb-2">
          <Target size={16} className="text-white/40" />
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-mono">Mission Briefings</p>
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
          Operational <span className="font-bold">Intelligence</span>
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div ref={scrollRef} className="flex gap-12 px-[15vw] mt-24">
        {missions.map((mission, idx) => (
          <div 
            key={idx} 
            className="w-[85vw] md:w-[65vw] lg:w-[55vw] flex-shrink-0 group perspective-1000"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative h-[70vh] bg-[#050505] border border-white/5 rounded-2xl p-10 md:p-14 flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.03)]">
              
              {/* Mission Overlay ID */}
              <div className="absolute top-0 right-0 p-8">
                <span className="text-6xl md:text-8xl font-black text-white/[0.02] font-mono leading-none">{mission.id}</span>
              </div>

              {/* Scanning Line Animation on hover */}
              <div className={`absolute top-0 left-0 w-full h-px bg-white/20 z-10 transition-opacity duration-300 ${hoveredIndex === idx ? 'opacity-100 animate-scan' : 'opacity-0'}`} />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Shield size={14} className="text-slate-500" />
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    {mission.layer}
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-4">
                  {mission.title}
                </h3>

                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-8">
                  {mission.tagline}
                </p>

                <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-2xl mb-8">
                  {mission.desc}
                </p>

                {/* Mission Status / Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-xl p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  {Object.entries(mission.stats).map(([label, val]) => (
                    <div key={label} className="flex flex-col gap-1">
                      <span className="text-[9px] text-slate-600 uppercase tracking-widest font-mono">{label}</span>
                      <span className="text-xs text-white font-mono font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row */}
              <div className="relative z-10 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-8">
                <div className="flex gap-2 flex-wrap">
                  {mission.tech.map(t => (
                    <span key={t} className="px-3 py-1.5 border border-white/10 rounded text-[10px] font-mono text-slate-500 bg-white/[0.01]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-8">
                  <a
                    href={mission.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-[0.2em] group/btn transition-colors hover:text-slate-300"
                  >
                    <Database size={14} />
                    Mission Data
                  </a>
                  <a
                    href={mission.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-all group-hover:translate-x-1"
                  >
                    Source Code <ArrowRight size={14} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Decorative Progress bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/5">
        <div className="w-1/2 h-full bg-white/40" />
      </div>
    </section>
  );
}
