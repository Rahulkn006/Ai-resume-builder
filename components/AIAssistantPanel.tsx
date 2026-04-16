"use client";

import { useResumeStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Sparkles, AlertTriangle, Lightbulb, Target } from "lucide-react";
import ProgressRing from "@/components/ui/ProgressRing";
import GlassCard from "@/components/ui/GlassCard";
import GradientText from "@/components/ui/GradientText";

export default function AIAssistantPanel() {
  const { data } = useResumeStore();
  const ats = data.atsScore;

  if (!ats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-white mb-1">
          Improve your Resume with <GradientText variant="gold">AI</GradientText>
        </h3>
        <p className="text-xs text-gray-500">Real-time insights from our AI engine</p>
      </div>

      {/* ATS Score Ring */}
      <GlassCard className="p-6 flex flex-col items-center">
        <ProgressRing score={ats.score} size={100} strokeWidth={6} />
        <p className="text-xs text-gray-500 mt-3 font-medium">Overall ATS Match</p>
      </GlassCard>

      {/* Missing Keywords */}
      {ats.missingKeywords.length > 0 && (
        <GlassCard className="p-5">
          <h4 className="font-bold text-white text-xs mb-3 flex items-center gap-2 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
            Missing Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {ats.missingKeywords.map((keyword, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-400/80 border border-yellow-500/20 font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Suggestions */}
      {ats.contentSuggestions.length > 0 && (
        <GlassCard className="p-5">
          <h4 className="font-bold text-white text-xs mb-3 flex items-center gap-2 uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
            Suggestions
          </h4>
          <ul className="space-y-2">
            {ats.contentSuggestions.map((suggestion, i) => (
              <li key={i} className="text-[12px] text-gray-400 flex items-start gap-2 leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-blue-400/60 mt-1.5 shrink-0" />
                {suggestion}
              </li>
            ))}
          </ul>
        </GlassCard>
      )}

      {/* Target Role */}
      <GlassCard className="p-4">
        <div className="flex items-center gap-2 text-xs">
          <Target className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-gray-500 font-medium">Target:</span>
          <span className="text-white font-semibold truncate">{data.targetJobRole}</span>
        </div>
      </GlassCard>
    </motion.div>
  );
}
