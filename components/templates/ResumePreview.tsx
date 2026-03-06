"use client";

import { useResumeStore } from "@/lib/store";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import CorporateTemplate from "./CorporateTemplate";
import CreativeTemplate from "./CreativeTemplate";
import TechTemplate from "./TechTemplate";
import HealthcareTemplate from "./HealthcareTemplate";
import FinanceTemplate from "./FinanceTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import TemplateSelector from "../TemplateSelector";

export default function ResumePreview() {
  const { data } = useResumeStore();

  const renderTemplate = () => {
    switch (data.activeTemplate) {
       case "minimal": return <MinimalTemplate />;
       case "corporate": return <CorporateTemplate />;
       case "creative": return <CreativeTemplate />;
       case "tech": return <TechTemplate />;
       case "healthcare": return <HealthcareTemplate />;
       case "finance": return <FinanceTemplate />;
       case "executive": return <ExecutiveTemplate />;
       case "modern":
       default: return <ModernTemplate />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <TemplateSelector />
      <div 
        id="resume-preview-container"
        className="w-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md overflow-hidden relative isolate" 
        style={{ aspectRatio: '1 / 1.414' }}>
        <div 
          className="absolute top-0 left-0 origin-top-left"
          style={{ transform: 'scale(0.4)', width: '250%', height: '250%' }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
