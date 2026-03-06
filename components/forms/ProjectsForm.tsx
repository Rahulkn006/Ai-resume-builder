"use client";

import { useResumeStore } from "@/lib/store";
import { Plus, Trash2, X } from "lucide-react";

export default function ProjectsForm() {
  const { data, updateProjects } = useResumeStore();

  const addProject = () => {
    updateProjects([
      ...data.projects,
      { name: "", description: "", technologies: [], link: "" }
    ]);
  };

  const removeProject = (index: number) => {
    const newProj = [...data.projects];
    newProj.splice(index, 1);
    updateProjects(newProj);
  };

  const updateField = (index: number, field: string, value: any) => {
    const newProj = [...data.projects];
    newProj[index] = { ...newProj[index], [field]: value };
    updateProjects(newProj);
  };

  const addTech = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const input = e.currentTarget;
      const val = input.value.trim().replace(',', '');
      if (val && !data.projects[index].technologies.includes(val)) {
        updateField(index, "technologies", [...data.projects[index].technologies, val]);
        input.value = '';
      }
    }
  };

  const removeTech = (projectIndex: number, techToRemove: string) => {
    const currentTech = data.projects[projectIndex].technologies;
    updateField(projectIndex, "technologies", currentTech.filter(t => t !== techToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">Projects</h3>
          <p className="text-gray-500 text-sm">Showcase your notable work.</p>
        </div>
        <button 
          onClick={addProject}
          className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 font-medium"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {data.projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
           <p className="text-gray-500 mb-4">No projects added yet.</p>
           <button onClick={addProject} className="text-blue-600 font-medium hover:underline">
             + Add your first project
           </button>
        </div>
      ) : (
        <div className="space-y-8">
          {data.projects.map((proj, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm relative group">
              <button 
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                  <input 
                    type="text" 
                    value={proj.name}
                    onChange={(e) => updateField(index, "name", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="E-commerce Platform Phase 2" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional)</label>
                  <input 
                    type="url" 
                    value={proj.link || ""}
                    onChange={(e) => updateField(index, "link", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="https://github.com/yourusername/project" 
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used (Press Enter to add)</label>
                <div className="w-full border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 flex flex-wrap gap-2 items-center min-h-[46px]">
                  {proj.technologies.map(tech => (
                    <span key={tech} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                      {tech}
                      <button onClick={() => removeTech(index, tech)} className="hover:text-blue-500"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                  <input 
                    type="text" 
                    onKeyDown={(e) => addTech(index, e)}
                    className="flex-1 outline-none text-sm min-w-[120px] bg-transparent" 
                    placeholder={proj.technologies.length === 0 ? "e.g. React, Node.js..." : ""} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                  <span>Description</span>
                  <span className="text-blue-600 text-xs font-semibold">AI will optimize this</span>
                </label>
                <textarea 
                  rows={3}
                  value={proj.description}
                  onChange={(e) => updateField(index, "description", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-y" 
                  placeholder="What did and how did it help?" 
                />
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
