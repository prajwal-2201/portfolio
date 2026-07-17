import { BookOpen, Target, Cloud, ShieldCheck, Terminal, ChevronRight, Activity } from 'lucide-react';

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
    icon: Terminal,
    color: "text-neon-green",
    progress: 55
  }
];

export default function LearningNow() {
  return (
    <section id="learning" className="py-32 px-6 relative z-10 bg-cyber-black">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-green" />
            <span className="text-xs font-mono text-neon-green tracking-widest uppercase">Growth Vector</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter text-white">Currently <span className="text-neon-green">Upgrading</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl font-mono uppercase tracking-widest">
            Continuous system updates in the evolving threat landscape.
          </p>
        </div>

        <div className="space-y-6">
          {learningGoals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <div
                key={goal.title}
                className="glass-panel p-8 border border-white/5 relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-neon-green/20 group-hover:bg-neon-green transition-all" />
                
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className={`p-4 rounded bg-black border border-white/10 ${goal.color}`}>
                    <Icon size={24} />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-tight">{goal.title}</h3>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">{goal.status}</p>
                  </div>
                  
                  <div className="w-full md:w-64">
                    <div className="flex justify-between text-[10px] font-mono mb-2 text-slate-600">
                      <span>SYNC_PROGRESS</span>
                      <span className="text-neon-green">{goal.progress}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        style={{ width: `${goal.progress}%` }}
                        className="h-full bg-neon-green shadow-[0_0_10px_#00ff66]"
                      />
                    </div>
                  </div>
                </div>
                
                {/* HUD Bit */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-20">
                  <div className="w-1 h-1 bg-white" />
                  <div className="w-1 h-1 bg-white" />
                  <div className="w-1 h-1 bg-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
