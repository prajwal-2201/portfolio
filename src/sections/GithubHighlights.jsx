import { motion } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';
import { FaGithub as Github, FaStar, FaCodeBranch } from 'react-icons/fa';

const pinnedRepos = [
  {
    name: "CyberSentinel (SOC Platform)",
    description: "Enterprise-grade security operations center platform for real-time threat detection and incident response orchestration.",
    html_url: "https://github.com/prajwal-2201",
    language: "Python",
    stargazers_count: 8,
    preview: "Ingestion -> Rule Engine -> Correlation -> Dashboard"
  },
  {
    name: "Intrusion Detection System",
    description: "Signature-based host intrusion detection system with real-time alerting and automated traffic mitigation capabilities.",
    html_url: "https://github.com/prajwal-2201/Intrusion-Detection-System-",
    language: "Python",
    stargazers_count: 5,
    preview: "Scapy Sniffing -> Suricata Rule Match -> Alert Log"
  },
  {
    name: "DockSmith (Container Runtime)",
    description: "C-level implementation of a container runtime focusing on Linux namespaces and control groups for process isolation.",
    html_url: "https://github.com/prajwal-2201/DockSmith",
    language: "Go",
    stargazers_count: 12,
    preview: "Unshare() -> PivotRoot() -> Cgroups Control"
  }
];

export default function GithubHighlights() {
  return (
    <section id="github" className="py-20 px-6 relative z-10 bg-cyber-darker/30">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-cyan-300">Work</span></h2>
            <p className="text-slate-400 font-light">
              Top security research and implementation projects on GitHub.
            </p>
          </div>
          <a href="https://github.com/prajwal-2201" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group">
            <span className="font-mono text-sm tracking-widest uppercase">Full Archive</span>
            <Github size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pinnedRepos.map((repo, index) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-panel p-6 hover:border-white/20 transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => window.open(repo.html_url, '_blank')}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded bg-white/5 group-hover:bg-neon-blue/10 transition-colors">
                  <Terminal size={20} className="text-neon-blue" />
                </div>
                <Github size={18} className="text-slate-500 group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors truncate" title={repo.name}>
                {repo.name}
              </h3>
              
              <p className="text-slate-400 text-sm font-light mb-4 line-clamp-3">
                {repo.description}
              </p>
              
              <div className="mb-6 p-3 bg-[#0a0a0a] border border-white/5 rounded text-xs text-slate-300 font-mono">
                <span className="text-neon-purple block mb-1">Preview:</span>
                {repo.preview}
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-blue"></span>
                  <span className="text-xs font-mono text-slate-400">{repo.language}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-neon-blue group-hover:underline">
                  VIEW_CODE <ExternalLink size={10} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
