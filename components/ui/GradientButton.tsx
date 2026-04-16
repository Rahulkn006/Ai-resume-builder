"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export default function GradientButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
  type = "button",
}: GradientButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-bold rounded-xl px-6 py-3 text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.3),0_0_60px_rgba(139,92,246,0.15)]",
    secondary:
      "bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20",
    ghost:
      "text-gray-400 hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.03 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
