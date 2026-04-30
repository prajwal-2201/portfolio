import { useEffect, useRef, useState, useCallback } from 'react';
import { ExternalLink, Star, GitFork, Shield, RefreshCw } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Classification Engine ────────────────────────────────────────────────────
// Any repo whose name, description, or topics match these keywords is automatically
// treated as a security repo. Push a new security project → it appears here live.
const SECURITY_KEYWORDS = [
  'security', 'cyber', 'forensic', 'malware', 'exploit', 'threat',
  'soc', 'siem', 'pentest', 'penetration', 'vuln', 'yara', 'sigma',
  'incident', 'dfir', 'detection', 'edr', 'firewall', 'ctf',
  'reverse', 'osint', 'recon', 'payload', 'bypass', 'inject',
  'nmap', 'metasploit', 'burp', 'wazuh', 'splunk', 'sentinel',
  'nexus', 'cybersentinel', 'infosec', 'appsec', 'devsecops',
];

// Hard-block list — repos that should never appear regardless of keywords
const BLOCKED = [
  'wanderluxe', 'portfolio', 'profolioilo', 'petsentinel',
  'pet-health', 'pet-app', 'syncflow', 'weather', 'blog',
];

const isSecurityRepo = (repo) => {
  const haystack = [
    repo.name,
    repo.description ?? '',
    ...(repo.topics ?? []),
  ].join(' ').toLowerCase();

  return SECURITY_KEYWORDS.some(kw => haystack.includes(kw));
};

const isBlocked = (repo) =>
  BLOCKED.some(b => repo.name.toLowerCase().includes(b));

// ─── Language accent colours ──────────────────────────────────────────────────
const LANG_COLORS = {
  Python:     '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C++':      '#f34b7d',
  C:          '#555555',
  Go:         '#00ADD8',
  Rust:       '#dea584',
  Shell:      '#89e051',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function GithubFeed() {
  const sectionRef   = useRef(null);
  const gridRef      = useRef(null);
  const [repos, setRepos]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [lastFetch, setLastFetch] = useState(null);
  const animatedIds = useRef(new Set());

  const fetchRepos = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res  = await fetch(
        'https://api.github.com/users/prajwal-2201/repos?sort=updated&per_page=50',
        { headers: { Accept: 'application/vnd.github+json' } }
      );
      const data = await res.json();
      if (!Array.isArray(data)) return;

      const filtered = data
        .filter(r => !r.fork)
        .filter(r => !isBlocked(r))
        .filter(r => isSecurityRepo(r))
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 9);

      setRepos(filtered);
      setLastFetch(new Date());
    } catch (e) {
      console.error('GitHub fetch failed', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => { fetchRepos(); }, [fetchRepos]);

  // Poll every 5 minutes — new pushes appear automatically
  useEffect(() => {
    const id = setInterval(() => fetchRepos(true), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchRepos]);

  // Animate only cards that haven't been animated yet
  useEffect(() => {
    if (loading || !gridRef.current) return;
    setTimeout(() => ScrollTrigger.refresh(), 120);

    const newCards = [...gridRef.current.children].filter(
      el => !animatedIds.current.has(el.dataset.id)
    );
    newCards.forEach(el => animatedIds.current.add(el.dataset.id));

    if (newCards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(newCards,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, repos]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-32 px-6 relative z-10 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Cinematic ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/[0.015] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <p className="text-[10px] text-slate-600 uppercase tracking-[0.35em] mb-3 font-mono">
              03 — Open Source · Live Feed
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-3">
              Security <span className="font-semibold">Repositories</span>
            </h2>
            <p className="text-slate-500 font-light text-sm max-w-md leading-relaxed">
              Auto-classified from GitHub. Any new security project I push
              appears here within minutes — no manual updates needed.
            </p>
          </div>

          {/* Live indicator + manual refresh */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_#22c55e]" />
              <span className="text-[11px] font-mono text-green-400 uppercase tracking-widest">Live Feed</span>
            </div>
            {lastFetch && (
              <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono">
                <span>Updated {lastFetch.toLocaleTimeString()}</span>
                <button
                  onClick={() => fetchRepos(true)}
                  className="hover:text-white transition-colors"
                  title="Refresh now"
                >
                  <RefreshCw size={11} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div className="w-8 h-8 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
            <p className="text-[11px] font-mono text-slate-600 uppercase tracking-widest">
              Fetching repositories…
            </p>
          </div>
        ) : repos.length === 0 ? (
          <p className="text-slate-600 text-sm font-mono text-center py-20">
            No security repositories found.
          </p>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {repos.map((repo) => (
              <a
                key={repo.id}
                data-id={String(repo.id)}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border border-white/8 bg-[#0a0a0a] rounded-2xl p-7 flex flex-col overflow-hidden
                           hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)]
                           transition-all duration-500"
              >
                {/* Hover glow layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Top row */}
                <div className="flex items-start justify-between mb-5 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-black transition-all duration-400">
                    <Shield size={18} strokeWidth={1.5} />
                  </div>
                  <ExternalLink
                    size={15}
                    className="text-slate-700 group-hover:text-white transition-colors mt-1"
                  />
                </div>

                {/* Repo name */}
                <h3 className="text-base font-semibold text-white mb-2 relative z-10 line-clamp-1 capitalize tracking-tight">
                  {repo.name.replace(/[-_]/g, ' ')}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 font-light leading-relaxed mb-6 flex-grow relative z-10 line-clamp-3">
                  {repo.description || 'Security tooling — see repository for details.'}
                </p>

                {/* Topics */}
                {repo.topics?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                    {repo.topics.slice(0, 3).map(t => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider text-slate-500 border border-white/8 bg-white/[0.03]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] relative z-10 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    {repo.language && (
                      <>
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: LANG_COLORS[repo.language] ?? '#64748b' }}
                        />
                        <span>{repo.language}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-white transition-colors">
                      <Star size={11} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 hover:text-white transition-colors">
                      <GitFork size={11} /> {repo.forks_count}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* ── Footer CTA ── */}
        <div className="mt-14 flex justify-center">
          <a
            href="https://github.com/prajwal-2201"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/15 text-white text-[11px] font-medium uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors rounded-full"
          >
            <Github size={14} /> All Repositories
          </a>
        </div>

      </div>
    </section>
  );
}
