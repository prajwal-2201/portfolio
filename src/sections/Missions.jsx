import { Terminal, Activity, Layers, Code, Zap, Server, Shield, Database, ExternalLink, AlertCircle, Settings, BarChart3, PlayCircle } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const projects = [
  {
    id: "SOC-X1",
    title: "CyberSentinel – SOC Platform",
    problem: "Enterprise security teams struggle with alert fatigue and fragmented log data across massive infrastructure.",
    solution: "A high-performance log orchestration platform that centralizes ingestion and correlates events in real-time.",
    impact: "Reduces alert fatigue by 35% through automated deduplication; Handles 500+ security events/sec.",
    techStack: ["Python", "ELK Stack", "Redis", "Docker"],
    github: "https://github.com/prajwal-2201",
    demo: "https://github.com/prajwal-2201", // Link to repo as briefing
    metrics: [
      { label: "Throughput", value: "500+ EPS" },
      { label: "Reduction", value: "35%" }
    ]
  },
  {
    id: "IDS-X2",
    title: "Host-Based IDS (Sniffer)",
    problem: "Generic network IDS systems often miss sophisticated application-layer attacks like fragmented SQLi.",
    solution: "Built a signature-based detection system focused on deep packet inspection and fragmentation reassembly.",
    impact: "Achieved 90%+ detection accuracy against OWASP Top 10 payloads; Analyzed 10k+ malicious packets.",
    techStack: ["Python", "Scapy", "Suricata", "Wireshark"],
    github: "https://github.com/prajwal-2201/Intrusion-Detection-System-",
    demo: "https://github.com/prajwal-2201/Intrusion-Detection-System-",
    metrics: [
      { label: "Accuracy", value: "92%" },
      { label: "Packets", value: "10k+" }
    ]
  },
  {
    id: "KERNEL-X3",
    title: "DockSmith – Container Runtime",
    problem: "Standard container runtimes are complex; understanding kernel-level isolation is critical for security engineers.",
    solution: "A 'from-scratch' container runtime implemented using direct Linux syscalls for process isolation.",
    impact: "100% Process isolation achieved via PID/Mount namespaces; zero-dependency runtime architecture.",
    techStack: ["Go", "Linux Namespaces", "cgroups", "chroot"],
    github: "https://github.com/prajwal-2201/DockSmith",
    demo: "https://github.com/prajwal-2201/DockSmith",
    metrics: [
      { label: "Isolation", value: "Kernel-Level" },
      { label: "Overhead", value: "<1%" }
    ]
  }
];

export default function Missions() {
  return (
    <section id="missions" className="py-32 px-6 relative z-10 bg-cyber-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-blue" />
            <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">Weaponized Systems</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white">Active <span className="text-neon-blue">Missions</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl font-mono uppercase tracking-[0.2em] leading-relaxed">
            Technical depth quantified. Solving real-world security bottlenecks.
          </p>
        </div>

        <div className="space-y-40">
          {projects.map((project, index) => (
            <div key={project.id} className="group relative">
              {/* Background ID text */}
              <div className="absolute -top-20 -left-10 text-[150px] font-black text-white/[0.02] select-none pointer-events-none font-mono">
                {project.id.split('-')[1]}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
                {/* Visual / Metrics Side */}
                <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="glass-panel p-6 border-t-2 border-t-neon-blue/50 hud-border bg-white/[0.02]">
                        <div className="text-3xl font-black text-white mb-1 font-mono">{m.value}</div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="glass-panel p-8 border border-white/5 bg-white/[0.01] relative overflow-hidden group-hover:border-neon-blue/20 transition-all">
                    <div className="flex items-center gap-3 mb-6">
                      <BarChart3 size={18} className="text-neon-blue" />
                      <h4 className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Operational_Impact</h4>
                    </div>
                    <p className="text-sm text-slate-400 font-mono leading-relaxed italic">
                      " {project.impact} "
                    </p>
                    <div className="absolute bottom-0 right-0 p-4 opacity-5">
                      <Activity size={80} />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-7 flex flex-col order-1 lg:order-2">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-mono text-neon-blue bg-neon-blue/10 px-3 py-1 border border-neon-blue/20">{project.id}</span>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-10 group-hover:text-neon-blue transition-colors uppercase tracking-tight">
                    {project.title}
                  </h3>

                  <div className="space-y-8 mb-12">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 mt-1">
                        <AlertCircle size={20} className="text-neon-red" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-mono text-neon-red uppercase tracking-widest mb-2">The_Problem</h4>
                        <p className="text-slate-300 text-lg leading-relaxed">{project.problem}</p>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="flex-shrink-0 mt-1">
                        <Settings size={20} className="text-neon-green" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-mono text-neon-green uppercase tracking-widest mb-2">The_Solution</h4>
                        <p className="text-slate-300 text-lg leading-relaxed">{project.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-12">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-slate-500 group-hover:text-slate-300 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-neon-blue transition-all"
                    >
                      <Github size={16} />
                      View_Source
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-8 py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
                    >
                      <PlayCircle size={16} />
                      Technical_Brief
                    </a>
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
