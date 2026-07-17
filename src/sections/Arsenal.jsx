import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Search, Terminal, Cpu } from 'lucide-react';
import SkillRadar from '../components/SkillRadar';

gsap.registerPlugin(ScrollTrigger);

const coreSkills = [
  { icon: <Search size={22} strokeWidth={1.5} />, name: 'DIGITAL FORENSICS', level: 96, desc: 'Host-level analysis & volatile memory artifact extraction.' },
  { icon: <Terminal size={22} strokeWidth={1.5} />, name: 'SEC AUTOMATION', level: 90, desc: 'Python/Go tooling & automated binary parsing.' },
  { icon: <Shield size={22} strokeWidth={1.5} />, name: 'SOC TRIAGE', level: 88, desc: 'SIEM log aggregation & real-time threat mapping.' },
  { icon: <Lock size={22} strokeWidth={1.5} />, name: 'INTRUSION DETECTION', level: 85, desc: 'Network traffic analysis & Suricata rule engineering.' },
  { icon: <Cpu size={22} strokeWidth={1.5} />, name: 'SYSTEMS ISOLATION', level: 82, desc: 'Container security & namespace boundaries.' }
];

export default function Arsenal() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndices, setActiveIndices] = useState([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemsRef.current,
        { y: 40, opacity: 0, rotateX: -10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            onEnter: () => {
              coreSkills.forEach((_, i) => {
                setTimeout(() => setActiveIndices(prev => [...prev, i]), 500 + (i * 100));
              });
            }
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 3D Tilt effect
  const handleMouseMove = (e, el) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.02)`;
  };
  const handleMouseLeave = (el) => {
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <section ref={containerRef} id="arsenal" className="py-40 bg-[#020202] relative z-10 border-t border-white/5 overflow-hidden">
      
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cpu size={16} className="text-cyan-500" />
              <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-[0.4em]">Subsystem Status</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">
              Operational <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">Capabilities</span>
            </h2>
          </div>
          <p className="text-slate-500 font-light text-base max-w-sm leading-relaxed border-l border-white/10 pl-6">
            Core tactical modules engineered for enterprise-grade defense and high-stakes forensic analysis.
          </p>
        </div>

        {/* Skill cards + Radar side by side */}
        <div className="flex flex-col xl:flex-row gap-12 items-start mb-16">
          {/* Skill cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreSkills.map((skill, index) => (
              <div
                key={index}
                ref={el => itemsRef.current[index] = el}
                className="group relative flex flex-col p-8 bg-[#050505] border border-white/[0.03] rounded-2xl transition-all duration-300 hover:border-cyan-500/20"
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease' }}
                onMouseMove={e => handleMouseMove(e, itemsRef.current[index])}
                onMouseLeave={() => handleMouseLeave(itemsRef.current[index])}
              >
                {/* Specular highlight on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                     style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(6,182,212,0.06), transparent 60%)' }} />

                <div className="text-slate-500 mb-8 group-hover:text-cyan-400 transition-all duration-500 transform group-hover:scale-110">
                  {skill.icon}
                </div>
                
                <h3 className="text-[11px] font-mono text-white/90 tracking-[0.2em] mb-4">
                  {skill.name}
                </h3>

                <div className="mb-6 h-[2px] w-full bg-white/5 relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-amber-500 transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                    style={{ width: activeIndices.includes(index) ? `${skill.level}%` : '0%' }}
                  />
                </div>

                <p className="text-[11px] text-slate-600 font-light leading-relaxed group-hover:text-slate-400 transition-colors">
                  {skill.desc}
                </p>

                <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-mono text-cyan-500/60 tracking-widest">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Radar Chart */}
          <div className="xl:w-[320px] flex-shrink-0 bg-[#050505] border border-cyan-900/20 rounded-2xl p-8 flex items-center justify-center hover:border-cyan-500/20 transition-all">
            <SkillRadar />
          </div>
        </div>
      </div>
    </section>
  );
}
