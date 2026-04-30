import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Search, Terminal, Cloud, BadgeCheck, ExternalLink, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const coreSkills = [
  { icon: <Search size={22} strokeWidth={1.5} />, name: 'SOC ANALYSIS', level: 94, desc: 'Real-time threat orchestration & log correlation.' },
  { icon: <Terminal size={22} strokeWidth={1.5} />, name: 'DFIR RESEARCH', level: 88, desc: 'Memory forensics & binary artifact extraction.' },
  { icon: <Lock size={22} strokeWidth={1.5} />, name: 'CRYPTOGRAPHY', level: 82, desc: 'PKI implementation & secure protocol design.' },
  { icon: <Shield size={22} strokeWidth={1.5} />, name: 'PENETRATION', level: 91, desc: 'Advanced exploitation & surface analysis.' },
  { icon: <Cloud size={22} strokeWidth={1.5} />, name: 'CLOUD SEC', level: 85, desc: 'Immutable architecture & IAM policy hardening.' }
];

const certifications = [
  {
    title: "Ethical Hacker Certification",
    issuer: "Cybersecurity Training",
    file: "/EthicalHackerUpdate20260318-33-peh44c.pdf",
    image: "/ethical-hacker.png"
  },
  {
    title: "Penetration Testing Course",
    issuer: "Advanced Security Labs",
    file: "/penetration-testing-course.pdf"
  },
  {
    title: "Information Security Certification",
    issuer: "Security Foundation",
    file: "/certificate_9390e20a-9cac-48f7-9fb4-35eddca4aeae.pdf"
  }
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
              // Trigger skill level animations
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

  return (
    <section ref={containerRef} id="arsenal" className="py-40 bg-[#020202] relative z-10 border-t border-white/5 overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cpu size={16} className="text-white/40" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">Subsystem Status</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">
              Operational <span className="font-medium">Capabilities</span>
            </h2>
          </div>
          <p className="text-slate-500 font-light text-base max-w-sm leading-relaxed border-l border-white/10 pl-6">
            Core tactical modules engineered for enterprise-grade defense and high-stakes forensic analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-32">
          {coreSkills.map((skill, index) => (
            <div 
              key={index} 
              ref={el => itemsRef.current[index] = el}
              className="group relative flex flex-col p-8 bg-[#050505] border border-white/[0.03] rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-[#080808]"
            >
              <div className="text-slate-500 mb-8 group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                {skill.icon}
              </div>
              
              <h3 className="text-[11px] font-mono text-white/90 tracking-[0.2em] mb-4">
                {skill.name}
              </h3>

              <div className="mb-6 h-[2px] w-full bg-white/5 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-white/40 transition-all duration-1000 ease-out"
                  style={{ width: activeIndices.includes(index) ? `${skill.level}%` : '0%' }}
                />
              </div>

              <p className="text-[11px] text-slate-600 font-light leading-relaxed group-hover:text-slate-400 transition-colors">
                {skill.desc}
              </p>

              <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-mono text-white/20 tracking-widest">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div 
          className="bg-[#050505] border border-white/[0.05] rounded-[2rem] p-10 md:p-16 relative overflow-hidden group/certs"
          ref={el => itemsRef.current[coreSkills.length] = el}
        >
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="max-w-md">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <BadgeCheck size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-medium text-white tracking-tight">Verified Credentials</h3>
              </div>
              <p className="text-slate-500 font-light text-lg mb-10 leading-relaxed">
                Academic and professional endorsements validating architectural expertise in offensive and defensive security.
              </p>
              
              <div className="flex items-center gap-3 text-slate-600 font-mono text-[10px] uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Auth Integrity: Verified
              </div>
            </div>
            
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <a 
                  key={idx}
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex flex-col justify-between border border-white/5 bg-white/[0.01] p-6 rounded-2xl hover:bg-white/[0.03] hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:border-white/30 transition-all">
                      <Terminal size={18} className="text-slate-500 group-hover/item:text-white" />
                    </div>
                    <ExternalLink size={14} className="text-slate-700 group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1 tracking-tight">{cert.title}</h4>
                    <p className="text-[10px] text-slate-600 uppercase font-mono tracking-widest">{cert.issuer}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
