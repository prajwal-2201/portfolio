import { motion } from 'framer-motion';
import { Shield, Code2, PenTool } from 'lucide-react';

const categories = [
  {
    title: "Cybersecurity & Blue Team",
    icon: Shield,
    color: "group-hover:text-red-400",
    borderHover: "hover:border-red-400/50",
    skills: ["Intrusion Detection Systems (IDS)", "Log Analysis", "SOC Workflows", "Vulnerability Assessment", "OWASP Top 10", "Cryptography (AES, RSA)"]
  },
  {
    title: "Tools & Platforms",
    icon: PenTool,
    color: "group-hover:text-neon-blue",
    borderHover: "hover:border-neon-blue/50",
    skills: ["Linux", "Kali Linux", "Git & GitHub", "VS Code", "Nmap", "Burp Suite", "Suricata (Exposure)"]
  },
  {
    title: "Programming",
    icon: Code2,
    color: "group-hover:text-neon-green",
    borderHover: "hover:border-neon-green/50",
    skills: ["Python (Security Scripting)", "C", "Java", "React", "Tailwind CSS", "JavaScript"]
  }
];

export default function Arsenal() {
  return (
    <section id="arsenal" className="py-32 px-6 relative">
      <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500">Arsenal</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Tools of the trade. Extracted directly from real-world practice and continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className={`glass-panel p-8 group border border-white/5 transition-colors duration-500 ${category.borderHover} flex flex-col`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyber-darker flex items-center justify-center border border-white/5">
                    <Icon size={24} className={`text-slate-400 transition-colors duration-500 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="px-4 py-2 bg-cyber-darker/50 rounded-md text-sm font-medium text-slate-300 border border-white/5 group-hover:border-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
