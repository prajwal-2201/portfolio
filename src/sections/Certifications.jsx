import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, FileCheck, CheckCircle2, ExternalLink, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    id: 1,
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    date: "2026",
    link: "/EthicalHackerUpdate20260318-33-peh44c.pdf",
    tag: "CYBER_DEFENSE",
    clearance: "LEVEL-3",
    hash: "a4c29f...8e1d",
  },
  {
    id: 2,
    title: "Penetration Testing",
    issuer: "Security Blue Team",
    date: "2026",
    link: "/penetration-testing-course.pdf",
    tag: "RED_TEAM_INTEL",
    clearance: "LEVEL-4",
    hash: "e3b0c4...1c14",
  },
  {
    id: 3,
    title: "Cybersecurity Analyst",
    issuer: "Tech Mahindra Foundation",
    date: "2026",
    link: "/certificate_9390e20a-9cac-48f7-9fb4-35eddca4aeae.pdf",
    tag: "SOC_OPERATIONS",
    clearance: "LEVEL-3",
    hash: "d41d8c...c39f",
  }
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, rotateX: -10 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.9, ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certifications" className="py-32 px-6 relative z-10 bg-[#020202] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Lock size={16} className="text-amber-500" />
            <span className="text-[10px] font-mono text-amber-600 uppercase tracking-[0.4em]">Credentials Vault // ACCESS GRANTED</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tighter">
            Verified <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Clearances</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <a
              key={cert.id}
              ref={el => cardsRef.current[i] = el}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[#050505] border border-amber-900/20 rounded-2xl p-8 flex flex-col overflow-hidden hover:border-amber-500/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.06)] transition-all duration-500 cursor-pointer"
            >
              {/* Classification strip */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/50 via-amber-300/20 to-transparent" />

              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-lg border border-amber-900/30 bg-amber-950/20 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                  <FileCheck size={22} className="text-amber-500" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[8px] font-mono text-amber-700/60 uppercase tracking-[0.2em]">{cert.tag}</span>
                  <span className="text-[7px] font-mono text-slate-700 uppercase tracking-widest border border-white/5 px-2 py-0.5 rounded">{cert.clearance}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors uppercase tracking-tight">
                {cert.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-mono mb-6 flex-grow">{cert.issuer}</p>

              {/* Hash row */}
              <div className="text-[8px] font-mono text-slate-700 mb-4">SHA256: {cert.hash}</div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[9px] font-mono text-green-600">
                  <CheckCircle2 size={11} />
                  VERIFIED · {cert.date}
                </div>
                <div className="text-[9px] font-mono text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  View Proof <ExternalLink size={9} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
