"use client";

import { useResumeStore } from "@/lib/store";
import { FileText } from "lucide-react";
import GradientText from "@/components/ui/GradientText";

export default function SummaryForm() {
  const { data, updateSummary } = useResumeStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">
          Professional <GradientText variant="blue">Summary</GradientText>
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Write a short, impactful summary of your professional background. If left empty, our AI will generate a concise one for you based on your profile.
        </p>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2 ml-1">
            <FileText className="w-4 h-4 text-blue-400" />
            Your Summary
          </label>
          <textarea
            value={data.summary || ""}
            onChange={(e) => updateSummary(e.target.value)}
            className="w-full rounded-xl px-4 py-3 h-32 resize-none"
            placeholder="e.g. Results-driven Software Engineer with 5+ years of experience in building scalable web applications..."
          />
          <p className="text-[11px] text-gray-600 mt-2 ml-1 italic">
            Tip: Keep it under 50 words to save space and maintain impact.
          </p>
        </div>
      </div>
    </div>
  );
}
