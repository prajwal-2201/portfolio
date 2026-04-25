import { Terminal, Activity, Layers, Code, Zap, Server, Shield, Database } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const projects = [
  {
    id: "SOC-X1",
    title: "CyberSentinel – SOC Platform",
    impact: "500+ EPS",
    impactDesc: "Security Events Per Second",
    efficiency: "35%",
    efficiencyDesc: "Alert Fatigue Reduction",
    whatItDoes: "Real-time enterprise-grade log orchestration and threat correlation platform.",
    techStack: ["Python", "Elasticsearch", "Logstash", "Kibana", "Redis"],
    whatIDid: [
      "Built high-throughput log ingestion pipeline",
      "Engineered rule-based correlation engine",
      "Designed analyst-first security dashboard",
      "Optimized query performance for petabyte-scale data"
    ],
    github: "https://github.com/prajwal-2201"
  },
  {
    id: "IDS-X2",
    title: "Host-Based IDS (Sniffer)",
    impact: "90%+",
    impactDesc: "Detection Accuracy (SQLi/XSS)",
    efficiency: "10k+",
    efficiencyDesc: "Tested Network Packets",
    whatItDoes: "Signature-based threat detection system for deep packet inspection.",
    techStack: ["Python", "Suricata", "Scapy", "Wireshark"],
    whatIDid: [
      "Authored 50+ custom Suricata signatures",
      "Developed real-time traffic analysis logic",
      "Integrated automated block-listing hooks",
      "Performed stress-testing under heavy packet load"
    ],
    github: "https://github.com/prajwal-2201/Intrusion-Detection-System-"
  },
  {
    id: "KERNEL-X3",
    title: "DockSmith – Container Runtime",
    impact: "LOW-LEVEL",
    impactDesc: "Linux Kernel Engineering",
    efficiency: "100%",
    efficiencyDesc: "Process Isolation achieved",
    whatItDoes: "Lightweight container runtime implemented from scratch focusing on kernel isolation.",
    techStack: ["Go", "Linux Namespaces", "cgroups", "chroot"],
    whatIDid: [
      "Implemented PID, Mount, and Network isolation",
      "Built cgroups resource restriction controller",
      "Designed custom image extraction and layering",
      "Engineered secure container lifecycle management"
    ],
    github: "https://github.com/prajwal-2201/DockSmith"
  }
];

export default function Missions() {
  return (
    <section id="missions" className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-blue" />
            <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">Weaponized Systems</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter text-white">Active <span className="text-neon-blue">Missions</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl font-mono uppercase tracking-widest">
            Engineering depth. Real metrics. Zero filler.
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div key={project.id} className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Side - Metrics & Impact */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="glass-panel p-8 border-l-4 border-l-neon-blue hud-border">
                    <div className="text-[10px] font-mono text-slate-500 mb-2">CRITICAL_METRIC_01</div>
                    <div className="text-5xl font-black text-white terminal-text mb-1">{project.impact}</div>
                    <div className="text-[10px] font-mono text-neon-blue uppercase tracking-widest">{project.impactDesc}</div>
                  </div>
                  
                  <div className="glass-panel p-8 border-l-4 border-l-neon-green hud-border">
                    <div className="text-[10px] font-mono text-slate-500 mb-2">CRITICAL_METRIC_02</div>
                    <div className="text-5xl font-black text-white terminal-text mb-1">{project.efficiency}</div>
                    <div className="text-[10px] font-mono text-neon-green uppercase tracking-widest">{project.efficiencyDesc}</div>
                  </div>
                </div>

                {/* Right Side - Engineering Depth */}
                <div className="lg:col-span-8 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <span className="text-xs font-mono text-slate-500 mb-2 block">{project.id} // SYSTEM_CORE</span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-neon-blue transition-colors">{project.title}</h3>
                    </div>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-blue/50 hover:text-neon-blue transition-all">
                      <Github size={24} />
                    </a>
                  </div>

                  <p className="text-lg text-slate-300 mb-10 font-light leading-relaxed">
                    {project.whatItDoes}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-mono text-neon-purple uppercase tracking-[0.2em] mb-6">
                        <Code size={14} /> Engineering_Tasks
                      </h4>
                      <ul className="space-y-3">
                        {project.whatIDid.map((task, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-400 group">
                            <span className="text-neon-purple mt-1">/</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center gap-2 text-[10px] font-mono text-neon-green uppercase tracking-[0.2em] mb-6">
                        <Layers size={14} /> Technology_Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="px-3 py-1.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-slate-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* System Flow Visualization (Placeholder) */}
                  <div className="mt-auto p-4 rounded bg-white/5 border border-white/5 flex items-center justify-between opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
                    <div className="flex items-center gap-4">
                      <Server size={16} className="text-neon-blue" />
                      <div className="h-px w-8 bg-neon-blue/20" />
                      <Database size={16} className="text-neon-purple" />
                      <div className="h-px w-8 bg-neon-purple/20" />
                      <Shield size={16} className="text-neon-green" />
                    </div>
                    <span className="text-[8px] font-mono text-slate-600 tracking-widest uppercase">Visualizing Architecture Flow // ENCRYPTED_LINK</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
