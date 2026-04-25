import { motion } from 'framer-motion';
import { Terminal, Activity, Layers, Code, Zap } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const projects = [
  {
    id: "P-01",
    title: "CyberSentinel - SOC Platform",
    impact: "Processes 500+ security events/sec and reduces alert fatigue by 35%.",
    whatItDoes: [
      "Real-time log ingestion",
      "Rule-based alert correlation",
      "Dashboard for analysts"
    ],
    techStack: ["Python", "ELK Stack", "REST APIs", "React"],
    whatIDid: [
      "Designed event pipeline",
      "Built correlation rules",
      "Optimized detection logic"
    ],
    github: "https://github.com/prajwal-2201"
  },
  {
    id: "P-02",
    title: "Vanguard IDS",
    impact: "Achieved 90% detection accuracy on malicious traffic with sub-10ms latency.",
    whatItDoes: [
      "Packet sniffing & deep inspection",
      "Signature-based threat matching",
      "Automated IP blocking mechanisms"
    ],
    techStack: ["C++", "Python", "Suricata", "Linux Netfilter"],
    whatIDid: [
      "Engineered packet parsing engine",
      "Integrated Suricata ruleset",
      "Developed auto-mitigation scripts"
    ],
    github: "https://github.com/prajwal-2201"
  }
];

export default function Missions() {
  return (
    <section id="missions" className="py-32 px-6 relative z-10">
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-blue" />
            <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">Weaponized Code</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-cyan-300">Missions</span></h2>
          <p className="text-slate-400 text-lg max-w-xl font-light">
            Real problems. Real systems. Real metrics.
          </p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8 md:p-10 border border-white/5 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-neon-blue px-2 py-1 rounded bg-neon-blue/10 border border-neon-blue/20">
                      {project.id}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                  </div>
                  <p className="text-neon-green font-mono text-sm flex items-center gap-2">
                    <Zap size={14} />
                    {project.impact}
                  </p>
                </div>
                
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-neon-purple/50 hover:text-neon-purple transition-colors">
                  <Github size={20} />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* What it does */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">
                    <Activity size={14} className="text-neon-blue" />
                    What It Does
                  </h4>
                  <ul className="space-y-2">
                    {project.whatItDoes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="text-neon-blue mt-1">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What I did */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">
                    <Terminal size={14} className="text-neon-purple" />
                    What I Did
                  </h4>
                  <ul className="space-y-2">
                    {project.whatIDid.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="text-neon-purple mt-1">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">
                    <Layers size={14} className="text-neon-green" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
