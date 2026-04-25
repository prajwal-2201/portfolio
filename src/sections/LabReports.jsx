import { motion } from 'framer-motion';
import { Shield, Lock, Search, FileText, ChevronRight } from 'lucide-react';

const reports = [
  {
    id: "LR-001",
    title: "Network Infiltration & IDS Bypass",
    category: "Red Team",
    date: "2024-03-12",
    description: "Deep dive into bypassing advanced Intrusion Detection Systems using packet fragmentation and timing-based obfuscation.",
    icon: Shield,
    color: "text-red-400",
    tags: ["Network Security", "IDS", "Stealth"],
    link: "https://github.com/prajwal-2201/Intrusion-Detection-System-/blob/main/report.pdf"
  },
  {
    id: "LR-002",
    title: "Web Application Penetration Testing",
    category: "Vulnerability Research",
    date: "2024-02-20",
    description: "Detailed security audit of web architectures, documenting exploitation paths for critical vulnerabilities.",
    icon: Search,
    color: "text-neon-blue",
    tags: ["Web Security", "PenTesting", "OWASP"],
    link: "https://github.com/prajwal-2201/Web-Application-Penetration-Testing/blob/main/report.pdf"
  },
  {
    id: "LR-003",
    title: "Air Quality Pattern Analysis",
    category: "Data Science",
    date: "2024-01-05",
    description: "Researching and predicting environmental patterns using advanced analytical models and data processing.",
    icon: Lock,
    color: "text-neon-green",
    tags: ["Analytics", "Prediction", "Research"],
    link: "https://github.com/prajwal-2201/Predicting-and-Analyzing-Air-Quality-Patterns/blob/main/report.pdf"
  }
];

export default function LabReports() {
  return (
    <section id="briefings" className="py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-neon-blue/5 to-transparent -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-blue" />
            <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">Classified Information</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Lab <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Reports</span> & Briefings</h2>
          <p className="text-slate-400 text-lg max-w-2xl font-light">
            Deep dives into hacking methodology, vulnerability research, and system defense strategies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report, index) => {
            const Icon = report.icon;
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-purple opacity-10 group-hover:opacity-30 rounded-2xl blur transition duration-300" />
                <div className="relative h-full bg-[#0d0d0d] border border-white/5 p-8 rounded-2xl flex flex-col hover:border-white/20 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl bg-white/5 ${report.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{report.id}</span>
                  </div>
                  
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">{report.category}</span>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{report.title}</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-6 flex-grow">
                    {report.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {report.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/5 text-slate-400 group-hover:text-slate-200">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <span className="text-[10px] font-mono text-slate-600">{report.date}</span>
                    <a 
                      href={report.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1 text-xs font-mono text-neon-blue hover:text-white transition-colors group/btn"
                    >
                      READ_REPORT
                      <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
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
