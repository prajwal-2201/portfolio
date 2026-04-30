import { useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    layer: "Infrastructure & Orchestration",
    title: "Nexus Threat Platform",
    tagline: "Real-time SOC Pipeline · FastAPI / WebSockets",
    desc: "Processes 15,000+ EPS through a live WebSocket pipeline. Custom correlation rules cut false positive alerts by 45% — directly reducing analyst alert fatigue and freeing the team to focus on critical P1 incidents rather than noise.",
    impact: "Reduced P1 response time by eliminating low-fidelity noise at the ingestion layer.",
    tech: ["Python", "FastAPI", "WebSockets", "Elasticsearch", "React", "Docker"],
    link: "https://github.com/prajwal-2201/Nexus",
    caseStudy: "https://github.com/prajwal-2201/Nexus#readme"
  },
  {
    layer: "Detection Engineering & Logic",
    title: "CyberSentinel DFIR",
    tagline: "Digital Forensics & Incident Response · YARA / Sigma",
    desc: "A forensic analysis engine built to defeat anti-forensic evasion. Parses raw NTFS/FAT structures at the sector level to recover hidden streams and deleted artifacts — achieving a 98% recovery success rate on heavily fragmented drives.",
    impact: "Enables attribution analysis by recovering attacker-wiped execution artefacts.",
    tech: ["C++", "WinAPI", "YARA", "Raw I/O", "Python"],
    link: "https://github.com/prajwal-2201/CyberSentinel",
    caseStudy: "https://github.com/prajwal-2201/CyberSentinel#readme"
  }
];

export default function Featured() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

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
      {/* Section label */}
      <div className="absolute top-16 left-10 md:left-20 z-20 flex flex-col gap-1">
        <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em]">01 — Deep Dive</p>
        <h2 className="text-xl md:text-3xl font-light text-white tracking-tight">
          Featured <span className="font-bold">Architectures</span>
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div ref={scrollRef} className="flex gap-10 px-[10vw] mt-16">
        {featuredProjects.map((project, idx) => (
          <div key={idx} className="w-[85vw] md:w-[62vw] lg:w-[52vw] flex-shrink-0 group">
            <div className="relative h-[68vh] bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 md:p-14 flex flex-col justify-between overflow-hidden transition-all duration-700 hover:border-white/25">

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Top content */}
              <div className="relative z-10">
                {/* Layer badge */}
                <span className="inline-block px-3 py-1 border border-white/10 rounded-full text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-5">
                  {project.layer}
                </span>

                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter mb-3">
                  {project.title}
                </h3>

                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-6">
                  {project.tagline}
                </p>

                <p className="text-base text-slate-400 font-light leading-relaxed max-w-xl mb-4">
                  {project.desc}
                </p>

                {/* Business impact callout */}
                <div className="flex items-start gap-3 bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3 max-w-xl">
                  <span className="text-white/40 text-lg leading-none mt-0.5">→</span>
                  <p className="text-xs text-slate-300 font-light italic leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              </div>

              {/* Bottom row */}
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex gap-2 flex-wrap">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1.5 border border-white/10 rounded-full text-[11px] text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  {/* Case Study link — always points to the README */}
                  <a
                    href={project.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity border-b border-white/30 pb-0.5"
                  >
                    Technical Case Study
                  </a>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors group-hover:translate-x-1 duration-300"
                  >
                    GitHub <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
