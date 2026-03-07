"use client";

import { useResumeStore } from "@/lib/store";

export default function ModernTemplate() {
  const { data } = useResumeStore();

  return (
    <div className="w-full h-full bg-white text-gray-900 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight uppercase">
          {data.personalDetails.fullName || "Your Name"}
        </h1>
        {data.targetJobRole && (
          <h2 className="text-lg font-medium text-blue-600 mt-1 uppercase tracking-wider">
            {data.targetJobRole}
          </h2>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
          {data.personalDetails.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails.phone && <span>• {data.personalDetails.phone}</span>}
          {data.personalDetails.linkedin && <span>• {data.personalDetails.linkedin}</span>}
        </div>
      </header>
      
      {/* Summary Section */}
      {data.summary && (
        <section className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-3">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed italic">
            {data.summary}
          </p>
        </section>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        
        {/* Left Column */}
        <div className="space-y-6">
          
          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">
                Experience
              </h3>
              <div className="space-y-5">
                {data.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        {exp.role} <span className="text-gray-400 font-normal">at</span> {exp.company}
                      </h4>
                      <span className="text-xs text-gray-500 font-medium">
                        {exp.startDate} — {exp.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b-2 border-blue-600 pb-1 mb-4">
                Projects
              </h3>
              <div className="space-y-5">
                {data.projects.map((proj, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-semibold text-gray-900">{proj.name}</h4>
                      {proj.link && (
                        <a href={proj.link} className="text-xs text-blue-600 hover:underline">View Project</a>
                      )}
                    </div>
                    {proj.technologies.length > 0 && (
                        <div className="text-xs text-blue-600 mb-2 font-medium">
                            {proj.technologies.join(", ")}
                        </div>
                    )}
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b-2 border-gray-300 pb-1 mb-4">
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold text-gray-900 text-sm">{edu.institution}</h4>
                    <p className="text-sm text-gray-700 mt-0.5">{edu.degree}</p>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                      <span>{edu.startDate} — {edu.endDate}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
        </div>
      </div>
    </div>
  );
}
