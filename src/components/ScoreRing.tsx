"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  gradientId?: string;
}

function getScoreColor(score: number): { stroke: string; text: string } {
  if (score >= 75) return { stroke: "#10b981", text: "text-emerald-600 dark:text-emerald-400" };
  if (score >= 50) return { stroke: "#f59e0b", text: "text-amber-600 dark:text-amber-400" };
  return { stroke: "#f43f5e", text: "text-rose-600 dark:text-rose-400" };
}

export default function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
}: ScoreRingProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const colors = getScoreColor(score);
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
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-label={`${label || "Score"}: ${score} out of 100`}
          role="img"
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            className="stroke-slate-100 dark:stroke-slate-800"
            strokeWidth={strokeWidth}
          />
          {/* Value Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition: "stroke-dashoffset 1s ease-out",
            }}
          />
        </svg>
        {/* Score number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-extrabold tabular-nums tracking-tight ${colors.text}`}>
            {score}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-400">/ 100</span>
        </div>
      </div>
      {(label || sublabel) && (
        <div className="text-center mt-1">
          {label && <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{label}</p>}
          {sublabel && <p className="text-[11px] text-slate-500 dark:text-slate-400">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}
