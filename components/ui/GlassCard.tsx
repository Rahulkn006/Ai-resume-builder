"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = "", hover = false, onClick }: GlassCardProps) {
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onClick}
        className={`
          bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
          transition-all duration-400
          hover:bg-white/[0.08] hover:border-white/[0.18]
          hover:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(59,130,246,0.05)]
          ${onClick ? "cursor-pointer" : ""}
          ${className}
        `}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`
        bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
