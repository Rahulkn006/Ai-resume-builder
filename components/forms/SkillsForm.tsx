"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store";
import { X } from "lucide-react";

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
        <h3 className="text-xl font-semibold mb-1">Skills</h3>
        <p className="text-gray-500 text-sm mb-6">Highlight your core competencies and technical skills.</p>
        
        <form onSubmit={handleAddSkill} className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="e.g. React.js, Project Management" 
          />
          <button 
            type="submit"
            disabled={!currentSkill.trim()}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mb-8">
          {data.skills.map((skill, index) => (
            <div 
              key={index}
              className="group flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm border border-gray-200"
            >
              <span>{skill}</span>
              <button 
                onClick={() => removeSkill(skill)}
                className="text-gray-400 hover:text-red-500 p-0.5 rounded-full hover:bg-red-50 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {data.skills.length === 0 && (
            <p className="text-gray-400 text-sm italic w-full">No skills added yet. Add some above.</p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3 block">Suggested Skills</h4>
          <div className="flex flex-wrap gap-2">
            {commonSkills.filter(skill => !data.skills.includes(skill)).map((skill) => (
              <button
                key={skill}
                onClick={() => updateSkills([...data.skills, skill])}
                className="text-sm bg-white border border-dashed border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-400 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
