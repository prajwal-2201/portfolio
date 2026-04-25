import { motion } from 'framer-motion';
import { Shield, Server, Search, Target } from 'lucide-react';

const categories = [
  {
    title: "Systems & Internals",
    icon: Server,
    color: "text-red-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(248,113,113,0.15)] group-hover:border-red-400/50",
    skills: ["Linux Namespaces", "cgroups", "Process Isolation", "Kernel Structures"]
  },
  {
    title: "Detection Engineering",
    icon: Shield,
    color: "text-neon-purple",
    glow: "group-hover:shadow-[0_0_30_rgba(176,38,255,0.15)] group-hover:border-neon-purple/50",
    skills: ["Rule-based Detection", "IOC Analysis", "YARA Signatures", "SIEM (ELK, Splunk)"]
  },
  {
    title: "Network & Traffic",
    icon: Search,
    color: "text-neon-green",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,255,102,0.15)] group-hover:border-neon-green/50",
    skills: ["Traffic Inspection", "Packet Analysis", "Wireshark", "Suricata Rules"]
  },
  {
    title: "Threat Analysis",
    icon: Target,
    color: "text-neon-blue",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] group-hover:border-neon-blue/50",
    skills: ["Log Parsing", "Alert Correlation", "Burp Suite", "Nmap Scans"]
  }
];

export default function Arsenal() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section id="arsenal" className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-purple" />
            <span className="text-xs font-mono text-neon-purple tracking-widest uppercase">Competencies</span>
            <div className="h-px w-12 bg-neon-purple" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500">Depth</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Core capabilities spanning systems, defense, and detection.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className={`glass-panel p-6 group border border-white/5 transition-all duration-300 ${category.glow} flex flex-col hover:-translate-y-2`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-cyber-darker flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className={`text-slate-400 transition-colors duration-300 group-hover:${category.color}`} />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-white transition-colors">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill} 
                      className="relative px-3 py-1.5 bg-cyber-darker/80 rounded border border-white/5 hover:border-white/20 transition-all cursor-default group/skill"
                    >
                      <span className="text-xs font-medium text-slate-400 group-hover/skill:text-white transition-colors">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
