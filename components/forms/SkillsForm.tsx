"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "@/components/ui/GradientButton";

export default function SkillsForm() {
  const { data, updateSkills } = useResumeStore();
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSkill.trim() && !data.skills.includes(currentSkill.trim())) {
      updateSkills([...data.skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateSkills(data.skills.filter(s => s !== skillToRemove));
  };

  const commonSkills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Python", "SQL", "Tailwind CSS", "Git", "UI/UX Design"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">Skills</h3>
        <p className="text-gray-500 text-sm mb-6">Highlight your core competencies and technical skills.</p>

        <form onSubmit={handleAddSkill} className="flex gap-3 mb-6">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            className="flex-1 rounded-xl px-4 py-3"
            placeholder="e.g. React.js, Project Management"
          />
          <GradientButton
            type="submit"
            disabled={!currentSkill.trim()}
            className="px-6 py-3"
          >
            Add
          </GradientButton>
        </form>

        {/* Added Skills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <AnimatePresence>
            {data.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group flex items-center gap-2 bg-white/[0.08] text-white px-3.5 py-2 rounded-xl text-sm border border-white/10 hover:border-white/20 transition-all"
              >
                <span className="font-medium">{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-gray-500 hover:text-red-400 p-0.5 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {data.skills.length === 0 && (
            <p className="text-gray-600 text-sm italic w-full">No skills added yet. Add some above.</p>
          )}
        </div>

        {/* Suggested Skills */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 ml-1">Suggested Skills</h4>
          <div className="flex flex-wrap gap-2">
            {commonSkills.filter(skill => !data.skills.includes(skill)).map((skill) => (
              <motion.button
                key={skill}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSkills([...data.skills, skill])}
                className="text-sm bg-white/[0.03] border border-dashed border-white/10 text-gray-500 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 px-3.5 py-2 rounded-xl transition-all duration-300 flex items-center gap-1"
              >
                + {skill}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
