"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store";
import { DownloadCloud, Save } from "lucide-react";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import TechTemplate from "./templates/TechTemplate";
import HealthcareTemplate from "./templates/HealthcareTemplate";
import FinanceTemplate from "./templates/FinanceTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import TemplateSelector from "./TemplateSelector";

export default function ExportPanel() {
  const { data } = useResumeStore();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const handleDownloadPDF = async () => {
    const container = document.getElementById("export-full-preview");
    if (!container) return;

    // Get the actual template element (the first child inside the scaled wrapper)
    const templateEl = container.querySelector('.absolute')?.firstElementChild;
    if (!templateEl) return;

    // Clone the template content
    const clonedContent = templateEl.outerHTML;

    // Collect all stylesheets from the current page
    const styleSheets = Array.from(document.styleSheets);
    let cssText = '';
    styleSheets.forEach((sheet) => {
      try {
        Array.from(sheet.cssRules).forEach((rule) => {
          cssText += rule.cssText + '\n';
        });
      } catch (e) {
        // Cross-origin sheets can't be read, skip them
        if (sheet.href) {
          cssText += `@import url("${sheet.href}");\n`;
        }
      }
    });

    // Open a new window with the resume content
    const printWindow = window.open('', '_blank', 'width=794,height=1123');
    if (!printWindow) {
      alert('Please allow pop-ups for this site to download your PDF.');
      return;
    }

    const fileName = data.personalDetails.fullName
      ? `${data.personalDetails.fullName} - Resume`
      : 'Resume';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${fileName}</title>
          <style>
            ${cssText}
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; }
            .resume-print-root { width: 794px; min-height: 1123px; }
          </style>
        </head>
        <body>
          <div class="resume-print-root">${clonedContent}</div>
        </body>
      </html>
    `);
    printWindow.document.close();

    // Wait for styles to fully load, then trigger print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handleSaveToDatabase = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save resume');
      }

      setSaveMessage({ type: 'success', text: 'Resume saved successfully!' });
    } catch (err: any) {
      setSaveMessage({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-2">
          Your Resume is Ready!
        </h3>
        <p className="text-gray-500">
          Review your resume below, then save or download.
        </p>
      </div>

      {/* Template Selector */}
      <TemplateSelector />

      {/* Full-Size Preview */}
      <div className="bg-gray-100 rounded-2xl p-4 md:p-6">
        <h4 className="text-sm font-semibold text-gray-600 mb-3 text-center">Full Preview</h4>
        <div className="mx-auto overflow-hidden rounded-lg shadow-xl border border-gray-200 bg-white" style={{ maxWidth: '600px' }}>
          <div 
            id="export-full-preview"
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '1 / 1.414' }}
          >
            <div 
              className="absolute top-0 left-0 origin-top-left"
              style={{ transform: 'scale(0.756)', width: '132.3%', height: '132.3%' }}
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg border text-sm text-center ${saveMessage.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {saveMessage.text}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={handleSaveToDatabase}
          disabled={isSaving}
          className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {isSaving ? <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent animate-spin rounded-full" /> : <Save className="w-6 h-6" />}
          </div>
          <span className="font-semibold text-gray-900 mb-1">Save Online</span>
          <span className="text-xs text-gray-500 text-center">Store in database to edit later</span>
        </button>

        <button 
          onClick={handleDownloadPDF}
          className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all group"
        >
          <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <DownloadCloud className="w-6 h-6" />
          </div>
          <span className="font-semibold text-gray-900 mb-1">Download PDF</span>
          <span className="text-xs text-gray-500 text-center">Export high quality PDF for printing</span>
        </button>
      </div>
    </div>
  );
}
