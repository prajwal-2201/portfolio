import { motion } from 'framer-motion';
import { BookOpen, Target, Cloud, ShieldCheck } from 'lucide-react';

const learningGoals = [
  {
    title: "Detection Engineering",
    status: "Advanced rule tuning and behavioral analysis",
    icon: Target,
    color: "text-red-400",
    progress: 70
  },
  {
    title: "Cloud Security",
    status: "Exploring IAM security and cloud infrastructure hardening",
    icon: Cloud,
    color: "text-neon-purple",
    progress: 45
  },
  {
    title: "Security+ / eJPT",
    status: "Preparing for industry certifications",
    icon: ShieldCheck,
    color: "text-neon-blue",
    progress: 85
  },
  {
    title: "Incident Response",
    status: "Improving workflows for forensic analysis",
    icon: BookOpen,
    color: "text-neon-green",
    progress: 55
  }
];

export default function LearningNow() {
  return (
    <section id="learning" className="py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12 flex items-center gap-4"
        >
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <BookOpen size={24} className="text-neon-green" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">What I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-cyan-300">Learning Now</span></h2>
            <p className="text-slate-400 font-light text-sm">Continuous growth in the evolving threat landscape.</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {learningGoals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel p-6 flex flex-col md:flex-row md:items-center gap-6 border-l-2 border-l-transparent hover:border-l-neon-green transition-all"
              >
                <div className={`p-3 rounded-lg bg-white/5 ${goal.color}`}>
                  <Icon size={20} />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-slate-200">{goal.title}</h3>
                  <p className="text-slate-400 text-sm">{goal.status}</p>
                </div>
                
                <div className="w-full md:w-48">
                  <div className="flex justify-between text-xs font-mono mb-2 text-slate-500">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${goal.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full bg-gradient-to-r from-white/20 to-${goal.color.split('-')[1]}-${goal.color.split('-')[2] || '500'} rounded-full`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
