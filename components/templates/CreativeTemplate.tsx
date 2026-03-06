"use client";

import { useResumeStore } from "@/lib/store";

export default function CreativeTemplate() {
  const { data } = useResumeStore();

  return (
    <div className="w-full h-full bg-[#fdfaf6] text-gray-800 flex font-sans max-w-5xl mx-auto overflow-hidden shadow-lg">
      
      {/* Left Sidebar (Dark) */}
      <div className="w-1/3 bg-[#2a363b] text-[#fdfaf6] p-8 shrink-0">
        
        <header className="mb-10">
          <div className="w-24 h-24 bg-[#e84a5f] rounded-full mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
             {data.personalDetails.fullName?.charAt(0) || "U"}
          </div>
          <h1 className="text-4xl font-black leading-tight mb-2 tracking-tight">
            {data.personalDetails.fullName || "Your Name"}
          </h1>
          {data.targetJobRole && (
            <h2 className="text-sm font-bold tracking-widest uppercase text-[#ff847c]">
              {data.targetJobRole}
            </h2>
          )}
        </header>

        <div className="space-y-8">
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#99b898] mb-4 border-b border-gray-600 pb-2">
                Contact
              </h3>
              <div className="space-y-3 text-sm font-light">
                {data.personalDetails.email && <div className="break-all">{data.personalDetails.email}</div>}
                {data.personalDetails.phone && <div>{data.personalDetails.phone}</div>}
                {data.personalDetails.linkedin && <div className="break-all">{data.personalDetails.linkedin}</div>}
              </div>
            </section>

            {data.skills.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#99b898] mb-4 border-b border-gray-600 pb-2">
                  Skills
                </h3>
                <div className="flex flex-col gap-2">
                  {data.skills.map((skill, idx) => (
                    <div key={idx} className="flex flex-col">
                       <span className="text-sm font-medium">{skill}</span>
                       {/* Abstract progress bar just for aesthetic */}
                       <div className="w-full h-1 bg-gray-700 mt-1 rounded">
                         <div className="h-full bg-[#e84a5f] rounded" style={{ width: `${Math.random() * 40 + 60}%` }} />
                       </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#99b898] mb-4 border-b border-gray-600 pb-2">
                  Education
                </h3>
                <div className="space-y-5">
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-sm text-[#ff847c]">{edu.degree}</h4>
                      <p className="text-xs text-gray-300 mt-1">{edu.institution}</p>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
                        {edu.startDate} – {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-2/3 p-10 bg-white">
        
        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-8 h-8 rounded-full bg-[#e84a5f] flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full" />
               </div>
               <h3 className="text-2xl font-black text-[#2a363b] tracking-tight">
                 Experience
               </h3>
            </div>
            
            <div className="space-y-8 pl-4 border-l-2 border-gray-100 ml-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-[#ff847c] rounded-full -left-[7px] top-1.5 border-[3px] border-white shadow-sm" />
                  
                  <div className="mb-2">
                    <h4 className="font-black text-xl text-[#2a363b]">
                      {exp.role} 
                    </h4>
                    <div className="flex gap-2 items-center text-sm font-bold text-[#e84a5f] mt-1">
                      <span>{exp.company}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-400 font-medium text-xs tracking-wider uppercase">
                         {exp.startDate} — {exp.endDate || "Present"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
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
            <div className="flex items-center gap-4 mb-6">
               <div className="w-8 h-8 rounded-full bg-[#99b898] flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full" />
               </div>
               <h3 className="text-2xl font-black text-[#2a363b] tracking-tight">
                 Projects
               </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6 pl-4 border-l-2 border-gray-100 ml-4">
              {data.projects.map((proj, idx) => (
                <div key={idx} className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-[#99b898] rounded-full -left-[7px] top-1.5 border-[3px] border-white shadow-sm" />
                  
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-black text-lg text-[#2a363b]">{proj.name}</h4>
                    {proj.link && (
                      <a href={proj.link} className="text-[10px] font-bold uppercase tracking-wider text-[#99b898] hover:text-[#2a363b] transition-colors border border-current px-2 py-0.5 rounded-full">Explore</a>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {proj.description}
                  </p>
                  
                  {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                          {proj.technologies.map(t => (
                              <span key={t} className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
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

      </div>

    </div>
  );
}
