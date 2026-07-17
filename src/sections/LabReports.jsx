import { ShieldAlert, Crosshair, AlertTriangle, Terminal, ChevronRight, FileSearch } from 'lucide-react';

const research = [
  {
    id: "ADV-R01",
    title: "IDS Bypass via Packet Fragmentation",
    category: "RED_TEAM_RESEARCH",
    brief: "Deep dive into evading stateful network inspection systems.",
    howItWorks: "Leveraged overlapping TCP fragments to desynchronize IDS state machine from host reassembly, effectively smuggling payloads past detection.",
    detection: "Signature-based detection fails; requires target-aware reassembly and fragmentation overlap thresholding.",
    mitigation: "Strict fragmentation timeout enforcement and non-overlapping reassembly policies.",
    impact: "Successfully bypassed Snort/Suricata default configurations.",
    link: "https://github.com/prajwal-2201/Intrusion-Detection-System-"
  },
  {
    id: "VULN-R02",
    title: "DVWA: Exploitation & Mitigation",
    category: "VULNERABILITY_LAB",
    brief: "Simulated real-world attacks on vulnerable web architectures.",
    howItWorks: "Executed SQL Injection and Cross-Site Scripting (XSS) at 'High' difficulty levels using manual and automated techniques.",
    detection: "Monitor server logs for meta-character sequences; implement WAF filtering for common malicious patterns.",
    mitigation: "Parameterized queries (SQLi) and robust input sanitization/CSP (XSS).",
    impact: "Mapped 5 critical exploitation paths to OWASP Top 10.",
    link: "https://github.com/prajwal-2201"
  }
];

export default function LabReports() {
  return (
    <section id="simulations" className="py-32 px-6 relative overflow-hidden bg-cyber-darker/50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-red" />
            <span className="text-xs font-mono text-neon-red tracking-widest uppercase">Intel Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase text-white">Security <span className="text-neon-red">Research</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl font-mono uppercase tracking-widest">
            Analyzing attack surface to build resilient defense.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {research.map((report, index) => (
            <div key={report.id} className="group relative">
              <div className="absolute -inset-1 bg-neon-red/10 blur group-hover:bg-neon-red/20 transition-all" />
              <div className="relative h-full bg-black/60 border border-white/5 p-10 rounded-none hud-border overflow-hidden">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-3 bg-neon-red/10 border border-neon-red/20 text-neon-red">
                    <Crosshair size={24} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-white/5 px-2 py-1 tracking-widest uppercase">{report.id}</span>
                </div>

                <div className="mb-2 text-[10px] font-mono text-neon-red uppercase tracking-[0.3em]">{report.category}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-neon-red transition-colors">{report.title}</h3>
                <p className="text-slate-400 font-light text-base mb-8 leading-relaxed italic">{report.brief}</p>

                <div className="space-y-8 font-mono">
                  <div className="border-l-2 border-neon-red/30 pl-4 py-1">
                    <span className="text-[10px] text-neon-red uppercase tracking-widest block mb-2">HOW_IT_WORKS</span>
                    <p className="text-xs text-slate-300 leading-relaxed uppercase">{report.howItWorks}</p>
                  </div>
                  
                  <div className="border-l-2 border-neon-blue/30 pl-4 py-1">
                    <span className="text-[10px] text-neon-blue uppercase tracking-widest block mb-2">DETECTION_METHOD</span>
                    <p className="text-xs text-slate-300 leading-relaxed uppercase">{report.detection}</p>
                  </div>

                  <div className="border-l-2 border-neon-green/30 pl-4 py-1">
                    <span className="text-[10px] text-neon-green uppercase tracking-widest block mb-2">MITIGATION_STRATEGY</span>
                    <p className="text-xs text-slate-300 leading-relaxed uppercase">{report.mitigation}</p>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-neon-red">
                    <ShieldAlert size={12} /> IMPACT: {report.impact}
                  </div>
                  <a 
                    href={report.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-slate-500 hover:text-neon-red transition-colors flex items-center gap-2 cursor-pointer z-20"
                  >
                    FULL_REPORT <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
