"use client";

import { useResumeStore } from "@/lib/store";
import { CheckCircle2, AlertCircle, TrendingUp, FileText } from "lucide-react";
import { motion } from "framer-motion";
import ProgressRing from "@/components/ui/ProgressRing";
import GlassCard from "@/components/ui/GlassCard";
import GradientText from "@/components/ui/GradientText";

export default function AtsScoreDisplay() {
  const { data } = useResumeStore();
  const ats = data.atsScore;

  if (!ats) return null;

  return (
    <div className="space-y-6">
      {/* Header with Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-6 items-center"
      >
        <ProgressRing score={ats.score} size={120} strokeWidth={8} />

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            AI <GradientText variant="blue">Optimization</GradientText> Complete
          </h3>
          <p className="text-gray-400 text-sm">
            Your resume has been analyzed and rewritten to better match the target role:{" "}
            <strong className="text-white">{data.targetJobRole}</strong>.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Missing Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-5 border-red-500/10">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
              <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              </div>
              Missing Keywords
            </h4>
            <ul className="space-y-2">
              {ats.missingKeywords.length > 0 ? (
                ats.missingKeywords.map((keyword, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-1.5 shrink-0" />
                    {keyword}
                  </li>
                ))
              ) : (
                <li className="text-sm text-emerald-400">Great job! No critical missing keywords detected.</li>
              )}
            </ul>
          </GlassCard>
        </motion.div>

        {/* Content Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-5 border-blue-500/10">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
              <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              </div>
              Content Suggestions
            </h4>
            <ul className="space-y-2">
              {ats.contentSuggestions.length > 0 ? (
                ats.contentSuggestions.map((suggestion, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-1.5 shrink-0" />
                    {suggestion}
                  </li>
                ))
              ) : (
                <li className="text-sm text-blue-400">Your content is solid.</li>
              )}
            </ul>
          </GlassCard>
        </motion.div>
      </div>

      {/* Formatting Suggestions */}
      {ats.formattingSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-5">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
              <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
              </div>
              Formatting Suggestions
            </h4>
            <ul className="space-y-2">
              {ats.formattingSuggestions.map((suggestion, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500/60 mt-1.5 shrink-0" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
