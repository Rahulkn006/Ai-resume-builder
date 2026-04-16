"use client";

import { useResumeStore } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "@/components/ui/GradientButton";

export default function EducationForm() {
  const { data, updateEducation } = useResumeStore();

  const addEducation = () => {
    updateEducation([
      ...data.education,
      { institution: "", degree: "", startDate: "", endDate: "", gpa: "", description: "" }
    ]);
  };

  const removeEducation = (index: number) => {
    const newEdu = [...data.education];
    newEdu.splice(index, 1);
    updateEducation(newEdu);
  };

  const updateField = (index: number, field: string, value: string) => {
    const newEdu = [...data.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    updateEducation(newEdu);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Education</h3>
          <p className="text-gray-500 text-sm">Add your academic background.</p>
        </div>
        <GradientButton variant="secondary" onClick={addEducation} className="text-xs px-4 py-2">
          <Plus className="w-3.5 h-3.5" /> Add Education
        </GradientButton>
      </div>

      {data.education.length === 0 ? (
        <div className="text-center py-14 bg-white/[0.02] rounded-2xl border-2 border-dashed border-white/10">
          <p className="text-gray-500 mb-4 text-sm">No education details added yet.</p>
          <button onClick={addEducation} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors text-sm">
            + Add your first school
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {data.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 border border-white/10 rounded-2xl bg-white/[0.03] relative group"
              >
                <button
                  onClick={() => removeEducation(index)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateField(index, "institution", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                      placeholder="Harvard University"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateField(index, "degree", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                      placeholder="B.S. Computer Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Start Date</label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateField(index, "startDate", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">End Date</label>
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateField(index, "endDate", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">GPA (Optional)</label>
                    <input
                      type="text"
                      value={edu.gpa || ""}
                      onChange={(e) => updateField(index, "gpa", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
