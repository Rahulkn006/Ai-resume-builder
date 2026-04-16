"use client";

import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export default function Badge({ children, icon, className = "" }: BadgeProps) {
  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        bg-white/5 border border-white/10 backdrop-blur-sm
        text-xs font-bold tracking-[0.15em] uppercase
        text-blue-400
        ${className}
      `}
    >
      {icon || <Sparkles className="w-3.5 h-3.5" />}
      {children}
    </div>
  );
}
