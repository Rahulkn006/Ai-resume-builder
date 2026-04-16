"use client";

import { useResumeStore } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "@/components/ui/GradientButton";

export default function ExperienceForm() {
  const { data, updateExperience } = useResumeStore();

  const addExperience = () => {
    updateExperience([
      ...data.experience,
      { company: "", role: "", startDate: "", endDate: "", description: "" }
    ]);
  };

  const removeExperience = (index: number) => {
    const newExp = [...data.experience];
    newExp.splice(index, 1);
    updateExperience(newExp);
  };

  const updateField = (index: number, field: string, value: string) => {
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    updateExperience(newExp);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Work Experience</h3>
          <p className="text-gray-500 text-sm">Add your relevant work history.</p>
        </div>
        <GradientButton variant="secondary" onClick={addExperience} className="text-xs px-4 py-2">
          <Plus className="w-3.5 h-3.5" /> Add Experience
        </GradientButton>
      </div>

      {data.experience.length === 0 ? (
        <div className="text-center py-14 bg-white/[0.02] rounded-2xl border-2 border-dashed border-white/10">
          <p className="text-gray-500 mb-4 text-sm">No work experience added yet.</p>
          <button onClick={addExperience} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors text-sm">
            + Add your first role
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {data.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 border border-white/10 rounded-2xl bg-white/[0.03] relative group"
              >
                <button
                  onClick={() => removeExperience(index)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Job Title / Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateField(index, "role", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateField(index, "company", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Start Date</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateField(index, "startDate", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">End Date</label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateField(index, "endDate", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                    />
                    <p className="text-[10px] text-gray-600 ml-1">Leave blank if currently working here</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1 flex justify-between">
                    <span>Description / Responsibilities</span>
                    <span className="text-blue-400 normal-case tracking-normal">AI will optimize this</span>
                  </label>
                  <textarea
                    rows={4}
                    value={exp.description}
                    onChange={(e) => updateField(index, "description", e.target.value)}
                    className="w-full rounded-xl px-4 py-3 resize-y"
                    placeholder="Describe your achievements and impact..."
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
