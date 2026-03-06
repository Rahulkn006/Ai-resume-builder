"use client";

import { useResumeStore } from "@/lib/store";

export default function HealthcareTemplate() {
  const { data } = useResumeStore();

  return (
    <div className="w-full h-full bg-white text-gray-800 font-serif" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      
      {/* Header */}
      <header className="px-10 pt-8 pb-5 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
          {data.personalDetails.fullName || "Your Name"}
        </h1>
        {data.targetJobRole && (
          <h2 className="text-sm font-normal text-gray-500 mt-1 tracking-wider uppercase">
            {data.targetJobRole}
          </h2>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-gray-500">
          {data.personalDetails.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails.phone && <span>|  {data.personalDetails.phone}</span>}
          {data.personalDetails.linkedin && <span>|  {data.personalDetails.linkedin}</span>}
        </div>
      </header>

      <div className="grid grid-cols-[1fr_240px]">
        
        {/* Main Content */}
        <div className="px-8 py-6 space-y-5">
          
          {/* Professional Experience */}
          {data.experience.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">
                Professional Experience
              </h3>
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="font-bold text-gray-900 text-sm">{exp.role}</h4>
                      <span className="text-xs text-gray-400 italic">
                        {exp.startDate} — {exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 font-semibold mb-1.5">{exp.company}</div>
                    <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Research & Projects */}
          {data.projects.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1 mb-4">
                Research & Projects
              </h3>
              <div className="space-y-4">
                {data.projects.map((proj, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">{proj.name}</h4>
                      {proj.link && <span className="text-[10px] text-gray-400 italic">View ↗</span>}
                    </div>
                    {proj.technologies.length > 0 && (
                      <div className="text-[10px] text-gray-500 italic mb-1">
                        {proj.technologies.join(" | ")}
                      </div>
                    )}
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar - Education & Competencies */}
        <div className="bg-gray-50 px-5 py-6 space-y-5 border-l border-gray-200">
          
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
                Education
              </h3>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-gray-900 text-xs leading-tight">{edu.degree}</h4>
                    <p className="text-xs text-gray-600 mt-0.5">{edu.institution}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {edu.startDate} — {edu.endDate}
                      {edu.gpa && <span className="ml-1">| GPA: {edu.gpa}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
                Core Competencies
              </h3>
              <ul className="space-y-1.5">
                {data.skills.map((skill, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5 text-[8px]">●</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
