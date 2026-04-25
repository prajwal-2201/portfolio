import { motion } from 'framer-motion';
import { Shield, Target, Cpu, Activity, User, Briefcase, GraduationCap } from 'lucide-react';

export default function Journey() {
  return (
    <section id="journey" className="py-32 px-6 relative z-10 bg-cyber-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side - Dossier Profile */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-1 border-white/5 hud-border"
            >
              <div className="bg-black/80 p-8 border border-white/5">
                <div className="w-full aspect-square bg-cyber-dark border border-white/10 mb-8 relative group overflow-hidden flex items-center justify-center">
                  <User size={80} className="text-slate-800" />
                  <div className="absolute inset-0 border-2 border-neon-blue/20 pointer-events-none" />
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-neon-blue/40" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-neon-blue/40" />
                  <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Scanning Effect Overlay */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-neon-blue/20 shadow-[0_0_10px_#00f0ff] animate-scan" />
                </div>
                
                <div className="space-y-4 font-mono">
                  <div>
                    <div className="text-[8px] text-slate-600 uppercase tracking-widest">Operator_Alias</div>
                    <div className="text-sm text-white font-bold">PRAJWAL_V</div>
                  </div>
                  <div>
                    <div className="text-[8px] text-slate-600 uppercase tracking-widest">Specialization</div>
                    <div className="text-sm text-neon-blue font-bold">DEFENSIVE_ENGINEERING</div>
                  </div>
                  <div>
                    <div className="text-[8px] text-slate-600 uppercase tracking-widest">Experience_Level</div>
                    <div className="text-sm text-slate-400">JUNIOR_SYSTEMS_ENG</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Professional Objective */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-neon-blue" />
                <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">Operator Profile</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter text-white">The <span className="text-neon-blue">Objective</span></h2>
              
              <div className="space-y-8 text-slate-300">
                <p className="text-xl md:text-2xl font-light leading-relaxed">
                  I’m a final-year Computer Science student specializing in <span className="text-white font-bold underline decoration-neon-blue underline-offset-8">cybersecurity</span>, with a focus on defensive security and detection engineering.
                </p>
                <p className="text-lg text-slate-400 font-light leading-relaxed">
                  I’ve built systems for real-time threat monitoring, intrusion detection, and vulnerability analysis — simulating how attacks happen and how to stop them. My work bridges the gap between software engineering and offensive security research.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-8 border-white/5 hover:border-neon-blue/20 transition-all group">
                <div className="flex items-center gap-3 mb-6">
                  <Activity size={20} className="text-neon-blue" />
                  <h4 className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Core_Focus_Areas</h4>
                </div>
                <ul className="space-y-3 font-mono text-[10px] text-slate-500">
                  <li className="flex items-center gap-3 group-hover:text-slate-300 transition-colors">
                    <span className="w-1 h-1 bg-neon-blue rounded-full" />
                    BUILDING_SOC_PIPELINES
                  </li>
                  <li className="flex items-center gap-3 group-hover:text-slate-300 transition-colors">
                    <span className="w-1 h-1 bg-neon-blue rounded-full" />
                    DESIGNING_DETECTION_RULES
                  </li>
                  <li className="flex items-center gap-3 group-hover:text-slate-300 transition-colors">
                    <span className="w-1 h-1 bg-neon-blue rounded-full" />
                    ANALYZING_LOG_PATTERNS
                  </li>
                  <li className="flex items-center gap-3 group-hover:text-slate-300 transition-colors">
                    <span className="w-1 h-1 bg-neon-blue rounded-full" />
                    THREAT_HUNTING_LOGIC
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-8 border-white/5 hover:border-neon-green/20 transition-all group">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap size={20} className="text-neon-green" />
                  <h4 className="text-[10px] font-mono text-white uppercase tracking-[0.3em]">Education_Status</h4>
                </div>
                <div className="space-y-4">
                  <div className="text-sm text-slate-300 font-bold">B.Tech in Computer Science</div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Expected_Graduation: 2025</div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 text-[8px] font-mono bg-neon-green/10 text-neon-green border border-neon-green/20">GPA: 8.41</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
