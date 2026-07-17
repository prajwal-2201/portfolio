import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: 'Public Repos', key: 'public_repos', suffix: '' },
  { label: 'Followers',    key: 'followers',     suffix: '' },
  { label: 'Following',    key: 'following',      suffix: '' },
];

function CountUp({ target, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function GithubStats() {
  const sectionRef = useRef(null);
  const [stats, setStats] = useState(null);
  const [visible, setVisible] = useState(false);
  const [topRepos, setTopRepos] = useState([]);

  useEffect(() => {
    // Fetch GitHub user stats
    fetch('https://api.github.com/users/prajwal-2201')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => {});

    // Fetch top repos
    fetch('https://api.github.com/users/prajwal-2201/repos?sort=updated&per_page=4')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTopRepos(data.slice(0, 4));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setVisible(true),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="github-stats" className="py-32 px-6 relative z-10 bg-[#020202] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Activity size={16} className="text-cyan-500" />
          <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-[0.4em]">Live Telemetry // api.github.com</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-light text-white tracking-tighter mb-16">
          Forensic <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">Activity</span>
        </h2>

        {/* Stat counters */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {STATS.map(({ label, key, suffix }) => (
            <div key={key} className="bg-[#050505] border border-cyan-900/20 rounded-2xl p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="absolute inset-0 bg-cyan-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-[9px] font-mono text-cyan-700 uppercase tracking-[0.3em] mb-3">{label}</p>
              <p className="text-5xl font-black text-white font-mono tabular-nums">
                {stats && visible ? <CountUp target={stats[key] || 0} /> : '—'}
                {suffix}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Repos */}
        {topRepos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topRepos.map(repo => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#050505] border border-white/5 rounded-xl p-6 flex flex-col gap-3 hover:border-cyan-500/20 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-mono text-white group-hover:text-cyan-400 transition-colors truncate">{repo.name}</p>
                  <span className="text-[8px] font-mono text-slate-600 border border-white/10 px-2 py-0.5 rounded flex-shrink-0">{repo.language || 'N/A'}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{repo.description || 'No description available.'}</p>
                <div className="flex items-center gap-4 text-[9px] font-mono text-slate-600 mt-auto pt-3 border-t border-white/5">
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  <span className="ml-auto">{new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
