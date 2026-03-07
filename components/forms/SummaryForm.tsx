"use client";

import { useResumeStore } from "@/lib/store";
import { FileText } from "lucide-react";

export default function SummaryForm() {
  const { data, updateSummary } = useResumeStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Professional Summary</h3>
        <p className="text-gray-500 text-sm mb-6">
          Write a short, impactful summary of your professional background. If left empty, our AI will generate a concise one for you based on your profile.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Your Summary
          </label>
          <textarea 
            value={data.summary || ""}
            onChange={(e) => updateSummary(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 h-32 resize-none" 
            placeholder="e.g. Results-driven Software Engineer with 5+ years of experience in building scalable web applications..." 
          />
          <p className="text-xs text-gray-500 mt-2 italic">
            Tip: Keep it under 50 words to save space and maintain impact.
          </p>
        </div>
      </div>
    </div>
  );
}
