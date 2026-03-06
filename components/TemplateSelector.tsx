"use client";

import { useResumeStore } from "@/lib/store";
import { Copy, Columns, LayoutTemplate, Edit3, Monitor, HeartPulse, DollarSign, Crown } from "lucide-react";

export default function TemplateSelector() {
  const { data, updateActiveTemplate } = useResumeStore();

  const templates = [
    { id: "modern", name: "Modern", icon: Copy, category: "General" },
    { id: "minimal", name: "Minimal", icon: Columns, category: "General" },
    { id: "corporate", name: "Corporate", icon: LayoutTemplate, category: "General" },
    { id: "creative", name: "Creative", icon: Edit3, category: "General" },
    { id: "tech", name: "Tech/IT", icon: Monitor, category: "Sector" },
    { id: "healthcare", name: "Medical", icon: HeartPulse, category: "Sector" },
    { id: "finance", name: "Finance", icon: DollarSign, category: "Sector" },
    { id: "executive", name: "Executive", icon: Crown, category: "Sector" },
  ] as const;

  const generalTemplates = templates.filter(t => t.category === "General");
  const sectorTemplates = templates.filter(t => t.category === "Sector");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">General Templates</h3>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {generalTemplates.map((t) => {
          const Icon = t.icon;
          const isActive = data.activeTemplate === t.id;
          return (
            <button
              key={t.id}
              onClick={() => updateActiveTemplate(t.id)}
              className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-all ${
                isActive 
                  ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500" 
                  : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
              <span className="font-medium">{t.name}</span>
            </button>
          )
        })}
      </div>

      <h3 className="text-sm font-semibold text-gray-700 mb-2">Sector-Specific</h3>
      <div className="grid grid-cols-2 gap-2">
        {sectorTemplates.map((t) => {
          const Icon = t.icon;
          const isActive = data.activeTemplate === t.id;
          return (
            <button
              key={t.id}
              onClick={() => updateActiveTemplate(t.id)}
              className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-all ${
                isActive 
                  ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500" 
                  : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
              <span className="font-medium">{t.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
}
