import { useEffect, useState } from 'react';
import { GitCommit } from 'lucide-react';

export default function GithubBadge() {
  const [lastPush, setLastPush] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/prajwal-2201/events/public?per_page=5')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const event = data.find(e => e.type === 'PushEvent') || data[0];
          const date = new Date(event.created_at);
          const now = new Date();
          const diffMs = now - date;
          const diffH = Math.floor(diffMs / 3600000);
          const diffD = Math.floor(diffMs / 86400000);
          if (diffH < 1) setLastPush('< 1h ago');
          else if (diffH < 24) setLastPush(`${diffH}h ago`);
          else setLastPush(`${diffD}d ago`);
        }
      })
      .catch(() => setLastPush('active'));
  }, []);

  if (!lastPush) return null;

  return (
    <a
      href="https://github.com/prajwal-2201"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-cyan-950/30 border border-cyan-900/30 rounded-full text-[9px] font-mono text-cyan-600 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
      title="View GitHub"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse flex-shrink-0" />
      <GitCommit size={10} />
      <span>Last active: {lastPush}</span>
    </a>
  );
}
