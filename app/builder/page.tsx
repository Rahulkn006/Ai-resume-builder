"use client";

import { useState } from "react";
import { User, GraduationCap, Briefcase, Code, FolderGit2, Star, CheckCircle, Download, ChevronRight, ChevronLeft, Sparkles, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useResumeStore } from "@/lib/store";
import EducationForm from "@/components/forms/EducationForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import SummaryForm from "@/components/forms/SummaryForm";
import TargetRoleForm from "@/components/forms/TargetRoleForm";
import AtsScoreDisplay from "@/components/AtsScoreDisplay";
import ResumePreview from "@/components/templates/ResumePreview";
import ExportPanel from "@/components/ExportPanel";
import GradientText from "@/components/ui/GradientText";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import Link from "next/link";

const steps = [
  { id: "personal", title: "Personal Info", icon: User },
  { id: "summary", title: "Summary", icon: Star },
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

      const newData = { ...data };

      if (result.optimizedExperience) {
        newData.experience = newData.experience.map((exp: any) => {
          const opt = result.optimizedExperience.find((o: any) => o.company === exp.company && o.role === exp.role);
          return opt ? { ...exp, description: opt.description } : exp;
        });
      }

      if (result.optimizedProjects) {
        newData.projects = newData.projects.map((proj: any) => {
          const opt = result.optimizedProjects.find((o: any) => o.name === proj.name);
          return opt ? { ...proj, description: opt.description } : proj;
        });
      }

      newData.atsScore = result.atsScore;

      if (result.summary) {
        newData.summary = result.summary;
      }

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

  const currentStepIndex = steps.findIndex(s => s.id === activeStep);

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 border-b md:border-r border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 flex-shrink-0 flex flex-col relative z-20">
        <div className="mb-8 hidden md:block">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">AI Builder</h2>
            </Link>
            <Link href="/dashboard" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider">
              Dashboard
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
        </div>

        <nav className="flex md:flex-col gap-1.5 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isPast = i < currentStepIndex;
            const isDisabled = isGenerating;

            return (
              <motion.button
                key={step.id}
                disabled={isDisabled}
                onClick={() => setActiveStep(step.id)}
                whileHover={!isDisabled ? { x: 2 } : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap group text-left ${
                  isActive
                    ? "bg-white/[0.08] text-white border-l-2 border-blue-500 shadow-lg shadow-black/10"
                    : isPast
                    ? "text-gray-400 hover:bg-white/5 hover:text-white"
                    : "text-gray-600 hover:bg-white/5 hover:text-gray-400"
                } ${isDisabled ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                  isActive
                    ? "bg-blue-500/10 border-blue-500/30"
                    : isPast
                    ? "bg-white/5 border-white/10"
                    : "bg-white/[0.02] border-white/5"
                }`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : isPast ? "text-gray-400" : "text-gray-600"}`} />
                </div>
                <span className="text-sm font-semibold">{step.title}</span>
              </motion.button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Create your <GradientText variant="gold">Perfect Resume</GradientText>
            </h1>
            <p className="text-gray-500 text-sm">Fill in your details and let AI do the heavy lifting.</p>
          </motion.div>

          <GlassCard className="p-6 md:p-10 relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 text-sm font-medium flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}

            {/* Form Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeStep === "personal" && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Personal Details</h3>
                      <p className="text-gray-500 text-sm mb-8">Lay the foundation for your professional identity.</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Full Name</label>
                          <input
                            type="text"
                            value={data.personalDetails.fullName}
                            onChange={(e) => updatePersonalDetails({ fullName: e.target.value })}
                            className="w-full rounded-xl px-5 py-3.5 text-white font-medium"
                            placeholder="e.g. Julian Stark"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Professional Email</label>
                          <input
                            type="email"
                            value={data.personalDetails.email}
                            onChange={(e) => updatePersonalDetails({ email: e.target.value })}
                            className="w-full rounded-xl px-5 py-3.5 text-white font-medium"
                            placeholder="name@domain.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Phone Number</label>
                          <input
                            type="tel"
                            value={data.personalDetails.phone}
                            onChange={(e) => updatePersonalDetails({ phone: e.target.value })}
                            className="w-full rounded-xl px-5 py-3.5 text-white font-medium"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">LinkedIn Profile</label>
                          <input
                            type="url"
                            value={data.personalDetails.linkedin || ""}
                            onChange={(e) => updatePersonalDetails({ linkedin: e.target.value })}
                            className="w-full rounded-xl px-5 py-3.5 text-white font-medium"
                            placeholder="linkedin.com/in/username"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStep === "education" && <EducationForm />}
                  {activeStep === "summary" && <SummaryForm />}
                  {activeStep === "skills" && <SkillsForm />}
                  {activeStep === "projects" && <ProjectsForm />}
                  {activeStep === "experience" && <ExperienceForm />}
                  {activeStep === "target" && <TargetRoleForm />}
                  {activeStep === "ats-results" && <AtsScoreDisplay />}
                  {activeStep === "export" && <ExportPanel />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <GradientButton
                variant="ghost"
                onClick={handlePrev}
                disabled={activeStep === steps[0].id || isGenerating}
                className="px-6"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </GradientButton>

              <GradientButton
                onClick={handleNext}
                disabled={isGenerating || activeStep === steps[steps.length - 1].id}
                loading={isGenerating}
                className="w-full sm:w-auto px-8 py-3.5"
              >
                {isGenerating ? (
                  "AI in Progress..."
                ) : activeStep === "target" ? (
                  <>Optimize & Finalize <Sparkles className="w-4 h-4" /></>
                ) : activeStep === "ats-results" ? (
                  "Review & Export"
                ) : (
                  <>Continue <ChevronRight className="w-4 h-4" /></>
                )}
              </GradientButton>
            </div>
          </GlassCard>

          <p className="text-center text-gray-600 text-[11px] font-bold tracking-[0.2em] uppercase mt-10">
            Secured by Industry-Standard Encryption
          </p>
        </div>
      </main>

      {/* Preview Panel */}
      <aside className="hidden xl:block w-[380px] border-l border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 flex-shrink-0 overflow-y-auto relative z-10">
        <div className="sticky top-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
              Real-time <span className="text-blue-400">Preview</span>
            </h3>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
          </div>

          {data.personalDetails.fullName || data.experience.length > 0 || data.education.length > 0 ? (
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              <div className="scale-[0.93] origin-top">
                <ResumePreview />
              </div>
            </div>
          ) : (
            <GlassCard className="aspect-[1/1.414] p-10 flex flex-col items-center justify-center text-center group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
                  <FileText className="w-7 h-7 text-gray-700" />
                </div>
                <p className="text-white font-bold text-sm mb-1">Awaiting Data</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your resume preview will appear here as you fill in your details.
                </p>
              </div>
            </GlassCard>
          )}
        </div>
      </aside>
    </div>
  );
}
