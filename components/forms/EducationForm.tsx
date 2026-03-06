"use client";

import { useResumeStore } from "@/lib/store";
import { Plus, Trash2 } from "lucide-react";

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Education</h3>
          <p className="text-gray-500 text-sm">Add your academic background.</p>
        </div>
        <button 
          onClick={addEducation}
          className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 font-medium"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {data.education.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
           <p className="text-gray-500 mb-4">No education details added yet.</p>
           <button onClick={addEducation} className="text-blue-600 font-medium hover:underline">
             + Add your first school
           </button>
        </div>
      ) : (
        <div className="space-y-8">
          {data.education.map((edu, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm relative group">
              <button 
                onClick={() => removeEducation(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <input 
                    type="text" 
                    value={edu.institution}
                    onChange={(e) => updateField(index, "institution", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="Harvard University" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input 
                    type="text" 
                    value={edu.degree}
                    onChange={(e) => updateField(index, "degree", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="B.S. Computer Science" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="month" 
                    value={edu.startDate}
                    onChange={(e) => updateField(index, "startDate", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input 
                    type="month" 
                    value={edu.endDate}
                    onChange={(e) => updateField(index, "endDate", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
                  <input 
                    type="text" 
                    value={edu.gpa || ""}
                    onChange={(e) => updateField(index, "gpa", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="3.8/4.0" 
                  />
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
