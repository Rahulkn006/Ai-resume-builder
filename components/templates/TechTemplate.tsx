"use client";

import { useResumeStore } from "@/lib/store";

export default function TechTemplate() {
  const { data } = useResumeStore();

  return (
    <div className="w-full h-full bg-white text-gray-800 p-10 font-sans" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      
      {/* Header */}
      <header className="mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {data.personalDetails.fullName || "Your Name"}
        </h1>
        {data.targetJobRole && (
          <h2 className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">
            {data.targetJobRole}
          </h2>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
          {data.personalDetails.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails.phone && <span>• {data.personalDetails.phone}</span>}
          {data.personalDetails.linkedin && <span>• {data.personalDetails.linkedin}</span>}
        </div>
      </header>
      
      {/* Summary */}
      {data.summary && (
        <section className="mb-5">
           <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.15em] border-b border-gray-300 pb-1 mb-2">
            Professional Summary
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed italic">
            {data.summary}
          </p>
        </section>
      )}

      {/* Skills - Prominent for tech roles */}
      {data.skills.length > 0 && (
        <section className="mb-5">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.15em] border-b border-gray-300 pb-1 mb-3">
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((skill, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded font-medium border border-gray-200">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-5">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.15em] border-b border-gray-300 pb-1 mb-3">
            Experience
          </h3>
          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold text-gray-900 text-sm">{exp.role}</h4>
                  <span className="text-xs text-gray-400 font-mono">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </span>
                </div>
                <div className="text-xs text-gray-500 font-medium">{exp.company}</div>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects - Grid layout for tech */}
      {data.projects.length > 0 && (
        <section className="mb-5">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.15em] border-b border-gray-300 pb-1 mb-3">
            Projects
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {data.projects.map((proj, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{proj.name}</h4>
                  {proj.link && <span className="text-[10px] text-gray-400">↗</span>}
                </div>
                {proj.technologies.length > 0 && (
                  <div className="text-[10px] text-gray-400 font-medium mb-1.5">
                    {proj.technologies.join(" · ")}
                  </div>
                )}
                <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-3">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.15em] border-b border-gray-300 pb-1 mb-3">
            Education
          </h3>
          <div className="space-y-2">
            {data.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-medium text-gray-900">{edu.degree}</span>
                  <span className="text-xs text-gray-500 ml-2">{edu.institution}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {edu.startDate} — {edu.endDate} {edu.gpa && <span className="ml-1">GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
