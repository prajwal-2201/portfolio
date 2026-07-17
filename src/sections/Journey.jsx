import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitBranch, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    ts: '2024-02-14T08:30:00Z',
    type: 'ARTIFACT_CARVED',
    title: 'Nexus Threat Platform',
    role: 'Forensic Systems Engineer',
    org: 'Self-Directed Research',
    desc: 'Built 15K+ EPS FastAPI/WebSocket SOC pipeline. Custom correlation cut false positives by 45%.',
    hash: 'a4c2...9f81',
  },
  {
    ts: '2023-11-05T14:10:00Z',
    type: 'EVIDENCE_TAGGED',
    title: 'CyberSentinel DFIR Engine',
    role: 'Core Developer',
    org: 'Open Source / GitHub',
    desc: 'NTFS/FAT sector-level parser in C++. 98% artifact recovery rate on fragmented drives.',
    hash: 'e3b0...1c14',
  },
  {
    ts: '2023-05-22T09:45:00Z',
    type: 'LOG_INGESTED',
    title: 'AegisTriage — Malware Analyzer',
    role: 'Malware Analyst',
    org: 'Security Research Lab',
    desc: 'Static PE analysis tool integrating YARA, entropy detection and import hash fingerprinting.',
    hash: 'd41d...c39f',
  },
  {
    ts: '2023-01-10T11:00:00Z',
    type: 'TIMELINE_BUILT',
    title: 'PQC FedLearn Anomaly Model',
    role: 'ML Security Engineer',
    org: 'Academic Research',
    desc: 'Post-quantum cryptography + federated learning for anomaly detection in distributed systems.',
    hash: '5f4d...7b29',
  },
];

const TYPE_COLORS = {
  ARTIFACT_CARVED: 'text-amber-400 border-amber-500/30',
  EVIDENCE_TAGGED: 'text-cyan-400 border-cyan-500/30',
  LOG_INGESTED:    'text-green-400 border-green-500/30',
  TIMELINE_BUILT:  'text-purple-400 border-purple-500/30',
};

export default function Journey() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical timeline line
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
      // Animate each card
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="py-32 px-6 relative z-10 bg-[#020202] border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={16} className="text-amber-500" />
            <span className="text-[10px] font-mono text-amber-600 uppercase tracking-[0.4em]">Plaso Log2Timeline // EVENT_LOG</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tighter">
            Forensic <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Timeline</span>
          </h2>
          <p className="text-slate-500 text-sm font-mono mt-3 max-w-md">All timestamps in ISO 8601 UTC · Chain of custody intact · 0 evidence gaps</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div ref={lineRef} className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-amber-500/20 to-transparent" />

          <div className="space-y-10 pl-16">
            {events.map((ev, i) => (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[2.85rem] top-4 w-3 h-3 rounded-full border-2 border-cyan-500 bg-[#020202] group-hover:bg-cyan-500 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.6)] transition-all duration-300" />

                <div className="bg-[#050505] border border-white/5 rounded-xl p-6 hover:border-cyan-900/30 transition-all duration-300">
                  {/* Timestamp row */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-[9px] font-mono text-slate-600">{ev.ts}</span>
                    <span className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${TYPE_COLORS[ev.type]}`}>
                      {ev.type}
                    </span>
                    <span className="text-[8px] font-mono text-slate-700 ml-auto">SHA256: {ev.hash}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{ev.title}</h3>
                  <p className="text-[10px] font-mono text-slate-600 mb-3 uppercase tracking-widest">
                    {ev.role} · {ev.org}
                  </p>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{ev.desc}</p>
                </div>
              </div>
            ))}

            {/* End marker */}
            <div className="relative pl-0">
              <div className="absolute -left-[2.85rem] top-2 w-3 h-3 rounded-full bg-slate-800 border border-slate-700" />
              <p className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">— Timeline origin · B.Tech CS 2021 —</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
