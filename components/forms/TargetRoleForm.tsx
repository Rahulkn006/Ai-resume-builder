"use client";

import { useResumeStore } from "@/lib/store";
import { Sparkles } from "lucide-react";
import GradientText from "@/components/ui/GradientText";

export default function TargetRoleForm() {
  const { data, updateTargetJobRole } = useResumeStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">
          Target <GradientText variant="gold">Role</GradientText>
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Tell our AI what role you are aiming for. We&apos;ll use this to optimize your resume&apos;s wording and ensure it highlights the most relevant skills.
        </p>

        <div className="bg-blue-500/[0.05] border border-blue-500/20 rounded-2xl p-6">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2 ml-1">
            <Sparkles className="w-4 h-4" />
            Target Job Title / Description
          </label>
          <input
            type="text"
            value={data.targetJobRole}
            onChange={(e) => updateTargetJobRole(e.target.value)}
            className="w-full rounded-xl px-4 py-3 bg-white/[0.05] border-blue-500/20 focus:border-blue-500/40"
            placeholder="e.g. Senior Frontend Developer at a fast-paced startup..."
          />
          <p className="text-[11px] text-blue-400/60 mt-2 ml-1">
            Tip: Be specific! The more details you provide, the better the AI can tailor your resume.
          </p>
        </div>
      </div>
    </div>
  );
}
