"use client";

import { useResumeStore } from "@/lib/store";

export default function MinimalTemplate() {
  const { data } = useResumeStore();

  return (
    <div className="w-full h-full bg-white text-gray-800 p-10 font-sans max-w-4xl mx-auto">
      
      {/* Header */}
      <header className="mb-8 text-center border-b pb-6">
        <h1 className="text-4xl font-light text-gray-900 tracking-wide mb-2">
          {data.personalDetails.fullName || "Your Name"}
        </h1>
        {data.targetJobRole && (
          <h2 className="text-lg text-gray-500 font-medium mb-4">
            {data.targetJobRole}
          </h2>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
          {data.personalDetails.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails.phone && <span>• {data.personalDetails.phone}</span>}
          {data.personalDetails.linkedin && <span>• {data.personalDetails.linkedin}</span>}
        </div>
      </header>
      
      {/* Summary */}
      {data.summary && (
        <section className="mb-8">
          <p className="text-sm text-gray-600 leading-relaxed italic text-center max-w-2xl mx-auto">
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Experience
          </h3>
          <div className="space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="relative pl-4 border-l-2 border-gray-200">
                <div className="absolute w-2 h-2 bg-gray-200 rounded-full -left-[5px] top-1.5" />
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-medium text-gray-900">
                    {exp.role} <span className="text-gray-500 font-normal">at {exp.company}</span>
                  </h4>
                  <span className="text-xs text-gray-400">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mt-2 whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Selected Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((proj, idx) => (
              <div key={idx} className="border border-gray-100 p-4 rounded-lg bg-gray-50/50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{proj.name}</h4>
                  {proj.link && (
                    <a href={proj.link} className="text-xs text-gray-400 hover:text-gray-900 transition-colors">Link ↗</a>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
                  {proj.description}
                </p>
                {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto">
                        {proj.technologies.map(t => (
                            <span key={t} className="text-[10px] uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {t}
                            </span>
                        ))}
                    </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills and Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="text-sm text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                  <p className="text-sm text-gray-500">{edu.institution}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {edu.startDate} — {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
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
