import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Search, Terminal, Cloud, BadgeCheck, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const coreSkills = [
  { icon: <Search size={24} strokeWidth={1.5} />, name: 'SOC Analysis', desc: 'Threat detection & log orchestration.' },
  { icon: <Terminal size={24} strokeWidth={1.5} />, name: 'Digital Forensics', desc: 'Artifact parsing & memory analysis.' },
  { icon: <Lock size={24} strokeWidth={1.5} />, name: 'Cryptography', desc: 'Encryption protocols & PKI.' },
  { icon: <Shield size={24} strokeWidth={1.5} />, name: 'Pentesting', desc: 'Vulnerability assessment & exploitation.' },
  { icon: <Cloud size={24} strokeWidth={1.5} />, name: 'Cloud Security', desc: 'Secure architectures & IAM.' }
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="arsenal" className="py-32 bg-[#020202] relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-4">
            Technical <span className="font-medium">Capabilities</span>
          </h2>
          <p className="text-slate-400 font-light text-lg">
            Core competencies in threat detection, defensive engineering, and offensive security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-24">
          {coreSkills.map((skill, index) => (
            <div 
              key={index} 
              ref={el => itemsRef.current[index] = el}
              className="group border border-white/10 flex flex-col p-6 bg-[#0a0a0a] rounded-xl hover:-translate-y-1 hover:border-white/30 transition-all duration-300"
            >
              <div className="text-slate-400 mb-4 group-hover:text-white transition-colors duration-300">
                {skill.icon}
              </div>
              <h3 className="text-sm font-medium text-white tracking-wide mb-2">
                {skill.name}
              </h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed group-hover:text-slate-400 transition-colors">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12" ref={el => itemsRef.current[coreSkills.length] = el}>
          <div className="flex items-center gap-4 mb-10">
            <BadgeCheck size={28} className="text-white" />
            <h3 className="text-2xl font-medium text-white">Certifications & Credentials</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <a 
                key={idx}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between border border-white/5 bg-white/[0.02] p-6 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    {cert.image ? (
                      <img src={cert.image} alt={cert.title} className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center border border-white/10">
                        <BadgeCheck size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                    )}
                    <ExternalLink size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-white font-medium mb-2 leading-tight">{cert.title}</h4>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-4">View Credential</p>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
