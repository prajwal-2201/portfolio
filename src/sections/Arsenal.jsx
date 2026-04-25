import { motion } from 'framer-motion';
import { Shield, Server, Search, Target, Cpu, HardDrive, Network, Lock } from 'lucide-react';

const coreCompetencies = [
  {
    title: "Linux Internals",
    icon: Cpu,
    color: "text-red-400",
    skills: ["Namespaces (PID, Mount, Net)", "cgroups (Resource Control)", "Seccomp/AppArmor", "Process Isolation"]
  },
  {
    title: "Detection Engineering",
    icon: Shield,
    color: "text-neon-blue",
    skills: ["Rule-based Detection", "IOC Analysis", "Suricata/Snort Rules", "Sigma Signatures"]
  },
  {
    title: "Infrastructure Security",
    icon: Server,
    color: "text-neon-purple",
    skills: ["Container Security", "Hardening (CI/CD)", "Log Ingestion (ELK)", "VPC Topologies"]
  },
  {
    title: "Threat Analysis",
    icon: Search,
    color: "text-neon-green",
    skills: ["Packet Analysis (Wireshark)", "Log Correlation", "Forensic Artifacts", "Malware Sandbox"]
  }
];

export default function Arsenal() {
  return (
    <section id="arsenal" className="py-32 px-6 relative z-10 bg-cyber-black">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-purple" />
            <span className="text-xs font-mono text-neon-purple tracking-widest uppercase">System Capabilities</span>
            <div className="h-px w-12 bg-neon-purple" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter text-white">Technical <span className="text-neon-purple">Depth</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-mono uppercase tracking-[0.2em]">
            Deep-stack engineering from kernel to cloud.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coreCompetencies.map((comp, index) => {
            const Icon = comp.icon;
            return (
              <motion.div
                key={comp.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-10 border border-white/5 relative overflow-hidden group hover:border-neon-purple/30 transition-all"
              >
                <div className="flex items-center gap-6 mb-10">
                  <div className={`w-16 h-16 rounded bg-black flex items-center justify-center border border-white/10 group-hover:border-neon-purple/50 transition-colors shadow-[inset_0_0_20px_rgba(176,38,255,0.05)]`}>
                    <Icon size={32} className={`${comp.color} transition-transform group-hover:scale-110`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">{comp.title}</h3>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Comp_Level: ADVANCED</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {comp.skills.map((skill) => (
                    <div 
                      key={skill} 
                      className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded text-sm text-slate-400 font-mono hover:text-white hover:bg-white/10 transition-all cursor-default"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-purple/50 group-hover:bg-neon-purple shadow-[0_0_5px_rgba(176,38,255,0.5)]" />
                      {skill}
                    </div>
                  ))}
                </div>
                
                {/* HUD Decoration */}
                <div className="absolute top-2 right-2 text-[8px] font-mono text-white/5 uppercase select-none">
                  Core_Capability_Matix // {comp.title.replace(' ', '_')}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
