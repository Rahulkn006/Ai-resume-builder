"use client";

import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  variant?: "gold" | "blue" | "cyan";
  className?: string;
}

const gradientMap = {
  gold: "from-yellow-400 to-orange-500",
  blue: "from-blue-500 to-purple-600",
  cyan: "from-cyan-400 to-blue-500",
};

export default function GradientText({ children, variant = "gold", className = "" }: GradientTextProps) {
  return (
    <span
      className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientMap[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
