import { useEffect, useRef } from 'react';

// Radar/Spider chart for skill domains
const SKILLS = [
  { label: 'DFIR',        value: 96 },
  { label: 'SOC',         value: 88 },
  { label: 'Malware',     value: 78 },
  { label: 'Scripting',   value: 90 },
  { label: 'Forensics',   value: 94 },
  { label: 'Detection',   value: 85 },
];

const SIZE = 280;
const CENTER = SIZE / 2;
const LEVELS = 5;

function polarToXY(angle, radius) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function buildPolygon(values, maxR) {
  const step = 360 / values.length;
  return values
    .map((v, i) => {
      const r = (v / 100) * maxR;
      const { x, y } = polarToXY(i * step, r);
      return `${x},${y}`;
    })
    .join(' ');
}

export default function SkillRadar() {
  const svgRef = useRef(null);
  const maxR = CENTER - 24;
  const step = 360 / SKILLS.length;

  // Animate polygon fill-in
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const polygon = svg.querySelector('#skill-poly');
    if (!polygon) return;
    polygon.style.opacity = '0';
    polygon.style.transition = 'opacity 1s ease 0.5s';
    setTimeout(() => { polygon.style.opacity = '1'; }, 100);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-[280px]">
      <svg ref={svgRef} viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-auto">
        {/* Web grid levels */}
        {Array.from({ length: LEVELS }).map((_, lvl) => {
          const r = ((lvl + 1) / LEVELS) * maxR;
          const pts = SKILLS.map((_, i) => {
            const { x, y } = polarToXY(i * step, r);
            return `${x},${y}`;
          }).join(' ');
          return (
            <polygon
              key={lvl}
              points={pts}
              fill="none"
              stroke="rgba(6,182,212,0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {SKILLS.map((_, i) => {
          const { x, y } = polarToXY(i * step, maxR);
          return (
            <line
              key={i}
              x1={CENTER} y1={CENTER}
              x2={x} y2={y}
              stroke="rgba(6,182,212,0.15)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          id="skill-poly"
          points={buildPolygon(SKILLS.map(s => s.value), maxR)}
          fill="rgba(6,182,212,0.12)"
          stroke="rgba(6,182,212,0.7)"
          strokeWidth="1.5"
          style={{ filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.4))' }}
        />

        {/* Dot nodes */}
        {SKILLS.map((skill, i) => {
          const r = (skill.value / 100) * maxR;
          const { x, y } = polarToXY(i * step, r);
          return (
            <circle
              key={i}
              cx={x} cy={y} r={3}
              fill="#06b6d4"
              style={{ filter: 'drop-shadow(0 0 4px #06b6d4)' }}
            />
          );
        })}

        {/* Labels */}
        {SKILLS.map((skill, i) => {
          const { x, y } = polarToXY(i * step, maxR + 18);
          return (
            <text
              key={i}
              x={x} y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="8"
              fill="rgba(148,163,184,0.7)"
              fontFamily="monospace"
              letterSpacing="1"
            >
              {skill.label}
            </text>
          );
        })}
      </svg>
      <p className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em] mt-2">Skill Domain Radar</p>
    </div>
  );
}
