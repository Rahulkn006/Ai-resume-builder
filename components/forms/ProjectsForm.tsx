"use client";

import { useResumeStore } from "@/lib/store";
import { Plus, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "@/components/ui/GradientButton";

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
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Projects</h3>
          <p className="text-gray-500 text-sm">Showcase your notable work.</p>
        </div>
        <GradientButton variant="secondary" onClick={addProject} className="text-xs px-4 py-2">
          <Plus className="w-3.5 h-3.5" /> Add Project
        </GradientButton>
      </div>

      {data.projects.length === 0 ? (
        <div className="text-center py-14 bg-white/[0.02] rounded-2xl border-2 border-dashed border-white/10">
          <p className="text-gray-500 mb-4 text-sm">No projects added yet.</p>
          <button onClick={addProject} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors text-sm">
            + Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {data.projects.map((proj, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 border border-white/10 rounded-2xl bg-white/[0.03] relative group"
              >
                <button
                  onClick={() => removeProject(index)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Project Name</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateField(index, "name", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                      placeholder="E-commerce Platform Phase 2"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Link (Optional)</label>
                    <input
                      type="url"
                      value={proj.link || ""}
                      onChange={(e) => updateField(index, "link", e.target.value)}
                      className="w-full rounded-xl px-4 py-3"
                      placeholder="https://github.com/yourusername/project"
                    />
                  </div>
                </div>

                <div className="mb-4 space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Technologies (Press Enter to add)</label>
                  <div className="w-full border border-white/10 rounded-xl px-3 py-2.5 bg-white/[0.05] focus-within:border-blue-500/50 focus-within:shadow-[0_0_0_2px_rgba(59,130,246,0.15)] flex flex-wrap gap-2 items-center min-h-[46px] transition-all">
                    {proj.technologies.map(tech => (
                      <span key={tech} className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-blue-500/20">
                        {tech}
                        <button onClick={() => removeTech(index, tech)} className="hover:text-blue-300">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      onKeyDown={(e) => addTech(index, e)}
                      className="flex-1 outline-none text-sm min-w-[120px] bg-transparent border-none p-0 shadow-none focus:ring-0 focus:shadow-none"
                      placeholder={proj.technologies.length === 0 ? "e.g. React, Node.js..." : ""}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1 flex justify-between">
                    <span>Description</span>
                    <span className="text-blue-400 normal-case tracking-normal">AI will optimize this</span>
                  </label>
                  <textarea
                    rows={3}
                    value={proj.description}
                    onChange={(e) => updateField(index, "description", e.target.value)}
                    className="w-full rounded-xl px-4 py-3 resize-y"
                    placeholder="What did you build and how did it help?"
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
