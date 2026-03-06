"use client";

import { useResumeStore } from "@/lib/store";

export default function FinanceTemplate() {
  const { data } = useResumeStore();

  return (
    <div className="w-full h-full bg-white text-gray-800 font-serif" style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}>
      
      {/* Header - Centered, traditional */}
      <header className="px-10 pt-8 pb-5 border-b-[3px] border-gray-900">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide text-center">
          {data.personalDetails.fullName || "Your Name"}
        </h1>
        {data.targetJobRole && (
          <h2 className="text-sm font-normal text-gray-500 mt-1 text-center tracking-[0.15em] uppercase">
            {data.targetJobRole}
          </h2>
        )}
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
          {data.personalDetails.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails.phone && <span>|  {data.personalDetails.phone}</span>}
          {data.personalDetails.linkedin && <span>|  {data.personalDetails.linkedin}</span>}
        </div>
      </header>

      <div className="px-10 py-6 space-y-5">

        {/* Experience - Company name first (finance convention) */}
        {data.experience.length > 0 && (
          <section>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-300 pb-1 mb-4">
              Professional Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <div>
                      <span className="font-bold text-gray-900 text-sm">{exp.company}</span>
                      <span className="text-gray-400 mx-1.5">—</span>
                      <span className="text-sm text-gray-700 italic">{exp.role}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1.5 whitespace-pre-wrap">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-300 pb-1 mb-4">
              Education
            </h3>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-gray-900 text-sm">{edu.institution}</span>
                    <div className="text-xs text-gray-600 mt-0.5">
                      {edu.degree} {edu.gpa && <span className="text-gray-400">— GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills - Inline, compact */}
        {data.skills.length > 0 && (
          <section>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-300 pb-1 mb-3">
              Technical & Professional Skills
            </h3>
            <div className="text-xs text-gray-700 leading-relaxed">
              {data.skills.join("  •  ")}
            </div>
          </section>
        )}

        {/* Projects / Achievements */}
        {data.projects.length > 0 && (
          <section>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em] border-b border-gray-300 pb-1 mb-4">
              Key Projects & Achievements
            </h3>
            <div className="space-y-3">
              {data.projects.map((proj, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900 text-sm">{proj.name}</h4>
                    {proj.link && <span className="text-[10px] text-gray-400">View ↗</span>}
                  </div>
                  {proj.technologies.length > 0 && (
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      {proj.technologies.join(" | ")}
                    </div>
                  )}
                  <p className="text-xs text-gray-600 leading-relaxed mt-1">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
