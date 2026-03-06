"use client";

import { useState } from "react";
import { User, GraduationCap, Briefcase, Code, Award, FolderGit2, Star, CheckCircle, Download } from "lucide-react";
import { useResumeStore } from "@/lib/store";
import EducationForm from "@/components/forms/EducationForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import TargetRoleForm from "@/components/forms/TargetRoleForm";
import AtsScoreDisplay from "@/components/AtsScoreDisplay";
import ResumePreview from "@/components/templates/ResumePreview";
import ExportPanel from "@/components/ExportPanel";

const steps = [
  { id: "personal", title: "Personal Info", icon: User },
  { id: "education", title: "Education", icon: GraduationCap },
  { id: "skills", title: "Skills", icon: Code },
  { id: "projects", title: "Projects", icon: FolderGit2 },
  { id: "experience", title: "Experience", icon: Briefcase },
  { id: "target", title: "Target Role", icon: Star },
  { id: "ats-results", title: "ATS Results", icon: CheckCircle },
  { id: "export", title: "Export", icon: Download },
];

export default function BuilderPage() {
  const [activeStep, setActiveStep] = useState("personal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data, updatePersonalDetails, setAllData } = useResumeStore();

  const handleNext = async () => {
    const currentIndex = steps.findIndex(s => s.id === activeStep);
    
    // If we're on the Target Role step (before ATS Results), trigger generation
    if (steps[currentIndex].id === "target") {
      await generateResume();
      return;
    }

    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
    }
  };

  const generateResume = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData: data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate resume');
      }

      // Merge the optimized content and ATS score into the store
      const newData = { ...data };
      
      // Update experience descriptions
      if (result.optimizedExperience) {
        newData.experience = newData.experience.map((exp: any) => {
          const opt = result.optimizedExperience.find((o: any) => o.company === exp.company && o.role === exp.role);
          return opt ? { ...exp, description: opt.description } : exp;
        });
      }

      // Update project descriptions
      if (result.optimizedProjects) {
        newData.projects = newData.projects.map((proj: any) => {
          const opt = result.optimizedProjects.find((o: any) => o.name === proj.name);
          return opt ? { ...proj, description: opt.description } : proj;
        });
      }

      newData.atsScore = result.atsScore;
      
      setAllData(newData);
      setActiveStep("ats-results");
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrev = () => {
    const currentIndex = steps.findIndex(s => s.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-b md:border-r border-gray-200 p-6 flex-shrink-0">
        <div className="mb-8 hidden md:block">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            AI Builder
          </h2>
          <p className="text-sm text-gray-500 mt-1">Complete your profile</p>
        </div>

        <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isDisabled = isGenerating;

            return (
              <button
                key={step.id}
                disabled={isDisabled}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                <span>{step.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Form Content Rendering Based on Active Step */}
          {activeStep === "personal" && (
             <div>
                <h3 className="text-xl font-semibold mb-6">Personal details</h3>
                <p className="text-gray-500 mb-8">Enter your basic contact information.</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={data.personalDetails.fullName}
                        onChange={(e) => updatePersonalDetails({ fullName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                        placeholder="Eren Yeager" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        value={data.personalDetails.email}
                        onChange={(e) => updatePersonalDetails({ email: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                        placeholder="aot@anime.com" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={data.personalDetails.phone}
                        onChange={(e) => updatePersonalDetails({ phone: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                        placeholder="+1 (555) 000-0000" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                      <input 
                        type="url" 
                        value={data.personalDetails.linkedin || ""}
                        onChange={(e) => updatePersonalDetails({ linkedin: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                        placeholder="https://linkedin.com/in/johndoe" 
                      />
                    </div>
                  </div>
                </div>
             </div>
          )}

          {activeStep === "education" && <EducationForm />}
          {activeStep === "skills" && <SkillsForm />}
          {activeStep === "projects" && <ProjectsForm />}
          {activeStep === "experience" && <ExperienceForm />}
          {activeStep === "target" && <TargetRoleForm />}
          {activeStep === "ats-results" && <AtsScoreDisplay />}
          {activeStep === "export" && <ExportPanel />}

          <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between items-center">
            <button 
              onClick={handlePrev}
              disabled={activeStep === steps[0].id || isGenerating}
              className="text-gray-600 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              disabled={isGenerating || activeStep === steps[steps.length - 1].id}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                 <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"/> Validating & Optimizing...
                </>
              ) : activeStep === "target" ? (
                'Generate & Finish'
              ) : activeStep === "ats-results" ? (
                'Review & Export'
              ) : (
                'Save & Continue'
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Preview Sidebar */}
      <aside className="hidden lg:block w-96 bg-gray-100 border-l border-gray-200 p-6 flex-shrink-0 overflow-y-auto">
         <div className="sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
            {data.personalDetails.fullName || data.experience.length > 0 || data.education.length > 0 ? (
               <ResumePreview />
            ) : (
              <div className="bg-white aspect-[1/1.414] shadow-sm border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-gray-400 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>
                <div className="z-10 text-center">
                  <Star className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm">Preview will appear here</p>
                  <p className="text-xs text-gray-400 mt-1">Complete your profile to see it</p>
                </div>
              </div>
            )}
         </div>
      </aside>

    </div>
  );
}
