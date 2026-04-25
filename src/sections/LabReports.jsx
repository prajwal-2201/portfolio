import { motion } from 'framer-motion';
import { ShieldAlert, Crosshair, AlertTriangle } from 'lucide-react';

const simulations = [
  {
    id: "SIM-01",
    attack: "IDS Bypass via Packet Fragmentation",
    icon: Crosshair,
    color: "text-red-400",
    howItWorks: "Attackers split malicious payloads into small overlapping fragments, causing the IDS state engine to misassemble the packets and fail to match signatures.",
    howToDetect: "Monitor for unusually high rates of IP fragmentation, overlapping offsets, and out-of-order fragment delivery.",
    howToFix: "Configure target-based fragment reassembly (e.g., frag3 in Snort) to strictly mirror the host OS's TCP/IP stack behavior."
  },
  {
    id: "SIM-02",
    attack: "DVWA: Command Injection",
    icon: AlertTriangle,
    color: "text-neon-purple",
    howItWorks: "User input is passed directly to a system shell without sanitization, allowing attackers to append shell operators (like `;` or `&&`) to execute arbitrary commands.",
    howToDetect: "Analyze web server logs for suspicious shell meta-characters and monitor child processes spawned by the web server service.",
    howToFix: "Use parameterized APIs (like `execFile`) instead of passing strings to a shell, and strictly validate/sanitize all user inputs."
  },
  {
    id: "SIM-03",
    attack: "OWASP: Broken Access Control",
    icon: ShieldAlert,
    color: "text-neon-blue",
    howItWorks: "An application fails to verify if a user has permissions for a requested resource, allowing them to modify URL parameters (like ID) to access other users' data.",
    howToDetect: "Implement robust audit logging for all authorization failures and monitor for excessive '403 Forbidden' or anomalous data access patterns.",
    howToFix: "Enforce authorization checks at the data layer for every single request, defaulting to deny."
  }
];

export default function LabReports() {
  return (
    <section id="simulations" className="py-32 px-6 relative overflow-hidden bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-red-500" />
            <span className="text-xs font-mono text-red-500 tracking-widest uppercase">Red Team Operations</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Security Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Attack Simulations</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl font-light">
            Understanding the adversary to build stronger defenses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {simulations.map((sim, index) => {
            const Icon = sim.icon;
            return (
              <motion.div
                key={sim.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative h-full flex flex-col"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 rounded-xl blur transition duration-300" />
                <div className="relative h-full bg-cyber-dark border border-white/5 p-6 md:p-8 rounded-xl flex flex-col hover:border-white/20 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-lg bg-white/5 ${sim.color}`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{sim.id}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-6 text-white">{sim.attack}</h3>
                  
                  <div className="space-y-6 flex-grow">
                    <div>
                      <span className="text-xs font-mono text-red-400 uppercase tracking-widest block mb-1">How it works</span>
                      <p className="text-slate-300 text-sm leading-relaxed">{sim.howItWorks}</p>
                    </div>
                    
                    <div className="h-px w-full bg-white/5" />
                    
                    <div>
                      <span className="text-xs font-mono text-neon-blue uppercase tracking-widest block mb-1">How to detect</span>
                      <p className="text-slate-300 text-sm leading-relaxed">{sim.howToDetect}</p>
                    </div>

                    <div className="h-px w-full bg-white/5" />
                    
                    <div>
                      <span className="text-xs font-mono text-neon-green uppercase tracking-widest block mb-1">How to fix</span>
                      <p className="text-slate-300 text-sm leading-relaxed">{sim.howToFix}</p>
                    </div>
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
