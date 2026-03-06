"use client";

import { useResumeStore } from "@/lib/store";
import { CheckCircle2, AlertCircle, TrendingUp, FileText } from "lucide-react";

export default function AtsScoreDisplay() {
  const { data } = useResumeStore();
  const ats = data.atsScore;

  if (!ats) return null;

  // Determine score color
  let scoreColor = "text-red-500";
  let bgProgress = "bg-red-500";
  if (ats.score >= 70) {
    scoreColor = "text-yellow-500";
    bgProgress = "bg-yellow-500";
  }
  if (ats.score >= 85) {
    scoreColor = "text-green-500";
    bgProgress = "bg-green-500";
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Circular Score Display (simplified logic) */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-100"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={`${scoreColor} transition-all duration-1000 ease-out`}
              strokeDasharray={`${ats.score}, 100`}
              strokeWidth="3"
              strokeDashoffset="0"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${scoreColor}`}>{ats.score}</span>
            <span className="text-xs text-gray-500 font-medium">ATS Match</span>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" /> AI Optimization Complete
          </h3>
          <p className="text-gray-600 text-sm">
            Your resume has been analyzed and rewritten to better match the target role: <strong className="text-gray-900">{data.targetJobRole}</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Keywords */}
        <div className="bg-red-50 rounded-lg p-5 border border-red-100">
          <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-red-600" /> Missing Keywords
          </h4>
          <ul className="space-y-2">
            {ats.missingKeywords.length > 0 ? (
               ats.missingKeywords.map((keyword, i) => (
                <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" /> {keyword}
                </li>
               ))
            ) : (
               <li className="text-sm text-green-700">Great job! No critical missing keywords detected.</li>
            )}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-blue-600" /> Content Suggestions
          </h4>
          <ul className="space-y-2">
            {ats.contentSuggestions.length > 0 ? (
               ats.contentSuggestions.map((suggestion, i) => (
                <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" /> {suggestion}
                </li>
               ))
            ) : (
               <li className="text-sm text-blue-800">Your content is solid.</li>
            )}
          </ul>
        </div>
      </div>
{/* Formatting specific */}
      {ats.formattingSuggestions.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-gray-600" /> formatting Suggestions
            </h4>
            <ul className="space-y-2">
                 {ats.formattingSuggestions.map((suggestion, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" /> {suggestion}
                  </li>
                 ))}
            </ul>
          </div>
      )}
    </div>
  );
}
