"use client";

import { useResumeStore } from "@/lib/store";

export default function ExecutiveTemplate() {
  const { data } = useResumeStore();

  return (
    <div className="w-full h-full bg-white text-gray-800 font-serif" style={{ fontFamily: "'Cambria', Georgia, serif" }}>
      
      {/* Header - Elegant with thin rule */}
      <header className="px-10 pt-10 pb-5 border-b border-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          {data.personalDetails.fullName || "Your Name"}
        </h1>
        {data.targetJobRole && (
          <h2 className="text-sm text-gray-500 mt-1 font-medium tracking-wide uppercase">
            {data.targetJobRole}
          </h2>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-gray-500">
          {data.personalDetails.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails.phone && <span>{data.personalDetails.phone}</span>}
          {data.personalDetails.linkedin && <span>{data.personalDetails.linkedin}</span>}
        </div>
      </header>

      <div className="px-10 py-6 space-y-5">

        {/* Leadership Experience */}
        {data.experience.length > 0 && (
          <section>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
              Leadership Experience
              <span className="flex-1 h-px bg-gray-300" />
            </h3>
            <div className="space-y-5">
              {data.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm inline">{exp.role}</h4>
                      <span className="text-gray-400 mx-2">|</span>
                      <span className="text-sm text-gray-600">{exp.company}</span>
                    </div>
                    <span className="text-xs text-gray-400 italic">
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-[1.7] mt-1 whitespace-pre-wrap pl-3 border-l border-gray-200">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two-column: Education + Core Expertise */}
        <div className="grid grid-cols-2 gap-8">
          
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.25em] mb-3 flex items-center gap-3">
                Education
                <span className="flex-1 h-px bg-gray-300" />
              </h3>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-gray-900 text-xs">{edu.degree}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{edu.institution}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {edu.startDate} – {edu.endDate}
                      {edu.gpa && <span className="ml-1.5">GPA: {edu.gpa}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Expertise */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.25em] mb-3 flex items-center gap-3">
                Core Expertise
                <span className="flex-1 h-px bg-gray-300" />
              </h3>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="w-1 h-1 rounded-full bg-gray-400" />
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Strategic Initiatives */}
        {data.projects.length > 0 && (
          <section>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.25em] mb-4 flex items-center gap-3">
              Strategic Initiatives
              <span className="flex-1 h-px bg-gray-300" />
            </h3>
            <div className="space-y-3">
              {data.projects.map((proj, idx) => (
                <div key={idx}>
                  <h4 className="font-bold text-gray-900 text-sm">{proj.name}</h4>
                  {proj.technologies.length > 0 && (
                    <div className="text-[10px] text-gray-400 mt-0.5">{proj.technologies.join(" · ")}</div>
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
