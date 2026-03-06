"use client";

import { useResumeStore } from "@/lib/store";

export default function TargetRoleForm() {
  const { data, updateTargetJobRole } = useResumeStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1">Target Job Role</h3>
        <p className="text-gray-500 text-sm mb-6">
          Tell our AI what role you are aiming for. We will use this to optimize your resume&apos;s wording and ensure it highlights the most relevant skills.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Target Job Title / Description
          </label>
          <input 
            type="text" 
            value={data.targetJobRole}
            onChange={(e) => updateTargetJobRole(e.target.value)}
            className="w-full border border-blue-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800" 
            placeholder="e.g. Senior Frontend Developer at a fast-paced startup..." 
          />
          <p className="text-xs text-blue-600 mt-2">
            Tip: Be specific! The more details you provide, the better the AI can tailor your resume.
          </p>
        </div>
      </div>
    </div>
  );
}
