"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  sublabel?: string;
  colorClass?: string;
  gradientId?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

function scoreToColor(score: number): {
  from: string;
  to: string;
  text: string;
} {
  if (score >= 75) return { from: "#10b981", to: "#14b8a6", text: "#10b981" };
  if (score >= 50) return { from: "#f59e0b", to: "#f97316", text: "#f59e0b" };
  return { from: "#ef4444", to: "#f43f5e", text: "#ef4444" };
}

export default function ScoreRing({
  score,
  size = 120,
  strokeWidth = 9,
  label,
  sublabel,
  gradientId,
}: ScoreRingProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const id = gradientId ?? `ring-${label.replace(/\s+/g, "-")}`;
  const colors = scoreToColor(score);
  const offset = circumference - (circumference * (animated ? score : 0)) / 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-label={`${label}: ${score} out of 100`}
          role="img"
        >
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.from} />
              <stop offset="100%" stopColor={colors.to} />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            className="stroke-slate-200 dark:stroke-white/10"
            strokeWidth={strokeWidth}
          />
          {/* Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition: "stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
        {/* Score number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-extrabold tabular-nums"
            style={{ color: colors.text }}
          >
            {score}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">/100</span>
        </div>
      </div>
      {(label || sublabel) && (
        <div className="text-center">
          {label && <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{label}</p>}
          {sublabel && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}
