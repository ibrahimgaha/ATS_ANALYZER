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

function getScoreColor(score: number) {
  if (score >= 75) return { stroke: "#10b981", text: "#10b981" };
  if (score >= 55) return { stroke: "#f59e0b", text: "#f59e0b" };
  return { stroke: "#f43f5e", text: "#f43f5e" };
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
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-label={`${label || "Score"}: ${score} out of 100`}
          role="img"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
          />
          {/* Fill */}
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
            style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>

        {/* Center number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-extrabold tabular-nums"
            style={{ fontSize: size * 0.22, lineHeight: 1, color: colors.text }}
          >
            {score}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-3)" }}>
            / 100
          </span>
        </div>
      </div>

      {(label || sublabel) && (
        <div className="text-center">
          {label && <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>{label}</p>}
          {sublabel && <p className="text-[11px]" style={{ color: "var(--text-3)" }}>{sublabel}</p>}
        </div>
      )}
    </div>
  );
}
