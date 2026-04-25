import { motion } from 'framer-motion';
import { Shield, Target, Terminal } from 'lucide-react';

const pillars = [
  {
    id: 1,
    title: "Defensive Security Focus",
    description: "Final-year CSE student dedicated to securing critical infrastructure and understanding adversarial tactics.",
    icon: Shield,
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "SOC & Infrastructure",
    description: "Hands-on experience building and deploying SOC systems, Intrusion Detection Systems (IDS), and vulnerability scanners.",
    icon: Terminal,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Threat Simulation",
    description: "Deeply interested in real-world threat simulation, detection engineering, and proactive defense strategies.",
    icon: Target,
    color: "from-red-500 to-orange-500"
  }
];

export default function Journey() {
  return (
    <section id="journey" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-blue" />
            <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">Identity</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Objective</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div 
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel p-8 hover:border-white/20 transition-all group relative overflow-hidden flex flex-col"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${pillar.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-slate-300 group-hover:text-white transition-colors" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-slate-200">{pillar.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed group-hover:text-slate-300 transition-colors text-sm">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
