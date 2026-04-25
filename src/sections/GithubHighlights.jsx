import { ExternalLink, Terminal, Code, Cpu, Shield, Zap } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const highlightedRepos = [
  {
    name: "CyberSentinel",
    desc: "Enterprise-grade SOC platform. Why it matters: Demonstrates ability to handle high-throughput log orchestration (500+ EPS) and complex rule-based correlation at scale.",
    link: "https://github.com/prajwal-2201",
    language: "Python",
    tag: "SOC_ENGINEERING",
    highlight: "Custom correlation engine implemented in Python."
  },
  {
    name: "Vanguard-IDS",
    desc: "Host-based intrusion detection system. Why it matters: Highlights deep understanding of network traffic (TCP/IP) and signature authorship for threat detection.",
    link: "https://github.com/prajwal-2201/Intrusion-Detection-System-",
    language: "Python / Suricata",
    tag: "TRAFFIC_ANALYSIS",
    highlight: "50+ custom rules tested against SQLi/XSS packets."
  },
  {
    name: "DockSmith",
    desc: "Linux container runtime. Why it matters: Proves low-level engineering depth in Linux kernel features like namespaces, cgroups, and filesystem isolation.",
    link: "https://github.com/prajwal-2201/DockSmith",
    language: "Go",
    tag: "SYSTEMS_CORE",
    highlight: "Direct syscall implementation for process unsharing."
  }
];

export default function GithubHighlights() {
  return (
    <section id="github" className="py-32 px-6 relative z-10 bg-cyber-darker/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-blue" />
            <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">Version Control</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white">Source <span className="text-neon-blue">Audit</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl font-mono uppercase tracking-widest">
            Engineering evidence. Peer-reviewed implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlightedRepos.map((repo, index) => (
            <div
              key={repo.name}
              className="glass-panel group relative flex flex-col p-8 border border-white/5 hover:border-neon-blue/30 transition-all cursor-default"
              onClick={() => window.open(repo.link, '_blank')}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="text-[8px] font-mono text-neon-blue/60 uppercase tracking-[0.3em]">{repo.tag}</div>
                <Github size={20} className="text-slate-600 group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight group-hover:text-neon-blue transition-colors">
                {repo.name}
              </h3>

              <p className="text-sm text-slate-400 font-light leading-relaxed mb-8">
                {repo.desc}
              </p>

              <div className="mt-auto">
                <div className="p-4 bg-black/40 border border-white/5 rounded font-mono text-[10px] text-slate-300 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-neon-purple" />
                  <span className="text-neon-purple block mb-1 uppercase tracking-widest">Key_Implementation:</span>
                  {repo.highlight}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    AUDIT_CODE <ExternalLink size={10} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 p-8 border border-dashed border-white/10 rounded text-center">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Interested in more low-level implementations?</p>
          <a 
            href="https://github.com/prajwal-2201" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-neon-blue hover:text-black transition-all"
          >
            Explore_Full_Repository_Network
            <Github size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
