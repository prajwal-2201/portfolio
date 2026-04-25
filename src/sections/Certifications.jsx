import { Award, ExternalLink, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

const certs = [
  {
    id: 1,
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    date: "2026",
    link: "/EthicalHackerUpdate20260318-33-peh44c.pdf",
    tag: "CYBER_DEFENSE"
  },
  {
    id: 2,
    title: "Penetration Testing",
    issuer: "Security Blue Team",
    date: "2026",
    link: "/penetration-testing-course.pdf",
    tag: "RED_TEAM_INTEL"
  },
  {
    id: 3,
    title: "Cybersecurity Analyst",
    issuer: "Tech Mahindra Foundation",
    date: "2026",
    link: "/certificate_9390e20a-9cac-48f7-9fb4-35eddca4aeae.pdf",
    tag: "SOC_OPERATIONS"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6 relative z-10 bg-cyber-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-purple" />
            <span className="text-xs font-mono text-neon-purple tracking-widest uppercase">Verified Credentials</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter text-white">Skill <span className="text-neon-purple">Verification</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl font-mono uppercase tracking-widest">
            Third-party validation of technical competence and security mindset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certs.map((cert) => (
            <a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel group p-10 border border-white/5 bg-white/[0.01] hover:border-neon-purple/40 hover:bg-white/[0.03] transition-all relative overflow-hidden flex flex-col h-full cursor-pointer"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck size={80} />
              </div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded border border-white/10 flex items-center justify-center text-neon-purple group-hover:border-neon-purple/50 transition-colors bg-black">
                  <FileCheck size={24} />
                </div>
                <div className="text-[8px] font-mono text-slate-600 group-hover:text-neon-purple transition-colors uppercase tracking-[0.2em]">{cert.tag}</div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors uppercase tracking-tight">
                {cert.title}
              </h3>
              
              <p className="text-sm text-slate-400 font-mono mb-8 flex-grow">
                {cert.issuer}
              </p>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                  <CheckCircle2 size={12} className="text-neon-green" /> VERIFIED_2026
                </div>
                <div className="text-[10px] font-mono text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 uppercase">
                  View_Proof <ExternalLink size={10} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
