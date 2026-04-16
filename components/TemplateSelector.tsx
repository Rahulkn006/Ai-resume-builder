"use client";

import { useResumeStore } from "@/lib/store";
import { Copy, Columns, LayoutTemplate, Edit3, Monitor, HeartPulse, DollarSign, Crown } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";

export default function TemplateSelector() {
  const { data, updateActiveTemplate } = useResumeStore();

  const templates = [
    { id: "modern", name: "Modern", icon: Copy, category: "General" },
    { id: "minimal", name: "Minimal", icon: Columns, category: "General" },
    { id: "corporate", name: "Corporate", icon: LayoutTemplate, category: "General" },
    { id: "creative", name: "Creative", icon: Edit3, category: "General" },
    { id: "tech", name: "Tech/IT", icon: Monitor, category: "Sector" },
    { id: "healthcare", name: "Medical", icon: HeartPulse, category: "Sector" },
    { id: "finance", name: "Finance", icon: DollarSign, category: "Sector" },
    { id: "executive", name: "Executive", icon: Crown, category: "Sector" },
  ] as const;

  const generalTemplates = templates.filter(t => t.category === "General");
  const sectorTemplates = templates.filter(t => t.category === "Sector");

  return (
    <GlassCard className="p-5 mb-4">
      <h3 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">General Templates</h3>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {generalTemplates.map((t) => {
          const Icon = t.icon;
          const isActive = data.activeTemplate === t.id;
          return (
            <motion.button
              key={t.id}
              onClick={() => updateActiveTemplate(t.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm transition-all duration-300 ${
                isActive
                  ? "border-blue-500/40 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-gray-600"}`} />
              <span className="font-medium">{t.name}</span>
            </motion.button>
          );
        })}
      </div>

      <h3 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Sector-Specific</h3>
      <div className="grid grid-cols-2 gap-2">
        {sectorTemplates.map((t) => {
          const Icon = t.icon;
          const isActive = data.activeTemplate === t.id;
          return (
            <motion.button
              key={t.id}
              onClick={() => updateActiveTemplate(t.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm transition-all duration-300 ${
                isActive
                  ? "border-blue-500/40 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-gray-600"}`} />
              <span className="font-medium">{t.name}</span>
            </motion.button>
          );
        })}
      </div>
    </GlassCard>
  );
}
