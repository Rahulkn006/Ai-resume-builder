"use client";

import { useResumeStore } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Work Experience</h3>
          <p className="text-gray-500 text-sm">Add your relevant work history.</p>
        </div>
        <button 
          onClick={addExperience}
          className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 font-medium"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {data.experience.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
           <p className="text-gray-500 mb-4">No work experience added yet.</p>
           <button onClick={addExperience} className="text-blue-600 font-medium hover:underline">
             + Add your first role
           </button>
        </div>
      ) : (
        <div className="space-y-8">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm relative group">
              <button 
                onClick={() => removeExperience(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title / Role</label>
                  <input 
                    type="text" 
                    value={exp.role}
                    onChange={(e) => updateField(index, "role", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="Software Engineer" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input 
                    type="text" 
                    value={exp.company}
                    onChange={(e) => updateField(index, "company", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="Acme Corp" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="month" 
                    value={exp.startDate}
                    onChange={(e) => updateField(index, "startDate", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input 
                    type="month" 
                    value={exp.endDate}
                    onChange={(e) => updateField(index, "endDate", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                  <div className="mt-1 text-xs text-gray-500">Leave blank if currently working here</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                  <span>Description / Responsibilities</span>
                  <span className="text-blue-600 text-xs font-semibold">AI will optimize this</span>
                </label>
                <textarea 
                  rows={4}
                  value={exp.description}
                  onChange={(e) => updateField(index, "description", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-y" 
                  placeholder="Describe your achievements and impact..." 
                />
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
