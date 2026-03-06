"use client";

import { useResumeStore } from "@/lib/store";

export default function CorporateTemplate() {
  const { data } = useResumeStore();

  return (
    <div className="w-full h-full bg-white text-gray-900 p-10 font-serif max-w-4xl mx-auto border-t-8 border-gray-900">
      
      {/* Header */}
      <header className="mb-6 pb-6 border-b-2 border-gray-200 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-widest mb-1">
          {data.personalDetails.fullName || "Your Name"}
        </h1>
        {data.targetJobRole && (
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            {data.targetJobRole}
          </h2>
        )}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-600 font-sans">
          {data.personalDetails.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails.phone && <span>| {data.personalDetails.phone}</span>}
          {data.personalDetails.linkedin && <span>| {data.personalDetails.linkedin}</span>}
        </div>
      </header>

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-500 pb-1 mb-4">
            Professional Experience
          </h3>
          <div className="space-y-5">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 text-lg">
                    {exp.role} <span className="font-normal italic">, {exp.company}</span>
                  </h4>
                  <span className="text-sm text-gray-600 font-sans font-medium">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed font-sans whitespace-pre-wrap ml-2">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-500 pb-1 mb-4">
            Key Projects
          </h3>
          <div className="space-y-4">
            {data.projects.map((proj, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 text-md">
                    {proj.name}
                  </h4>
                  {proj.link && (
                    <a href={proj.link} className="text-xs text-blue-800 font-sans hover:underline">Project Link</a>
                  )}
                </div>
                <p className="text-sm text-gray-800 leading-relaxed font-sans whitespace-pre-wrap ml-2 mb-1">
                  {proj.description}
                </p>
                {proj.technologies.length > 0 && (
                    <div className="text-xs font-sans text-gray-600 ml-2 font-semibold italic">
                        Technologies: {proj.technologies.join(", ")}
                    </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Skills Split */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        
        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-500 pb-1 mb-4">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="font-bold text-gray-900">{edu.institution}</h4>
                  <p className="text-sm text-gray-800 italic">{edu.degree}</p>
                  <p className="text-xs text-gray-600 font-sans mt-0.5">
                    {edu.startDate} – {edu.endDate}
                  </p>
                  {edu.gpa && (
                     <p className="text-xs text-gray-600 font-sans font-semibold mt-0.5">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b border-gray-500 pb-1 mb-4">
              Core Competencies
            </h3>
            <div className="font-sans text-sm text-gray-800 leading-relaxed">
               {data.skills.join(" • ")}
            </div>
          </section>
        )}
      </div>

    </div>
  );
}
