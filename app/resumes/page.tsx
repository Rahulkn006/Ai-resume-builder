"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Plus, Trash2, Copy, ExternalLink, Clock,
  LayoutGrid, List, Search as SearchIcon, Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import DashboardLayout from "@/components/DashboardLayout";
import GradientText from "@/components/ui/GradientText";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Resume {
  id: string;
  title: string;
  template: string;
  updated_at: string;
  ats_score: number;
  status: string;
}

function getScoreColor(score: number) {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-yellow-400";
  return "text-red-400";
}

function getScoreBarGradient(score: number) {
  if (score >= 85) return "from-emerald-500 to-cyan-400";
  if (score >= 70) return "from-yellow-500 to-orange-400";
  return "from-red-500 to-orange-400";
}

function StatusBadge({ status }: { status: string }) {
  const isComplete = status === "complete";
  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
      ${isComplete
        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
      }
    `}>
      {isComplete ? "Complete" : "Draft"}
    </span>
  );
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function ResumesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        // Try getting email from Supabase auth session first
        const { data: { user } } = await supabase.auth.getUser();
        let email = user?.email;

        // Fallback to localStorage preferences
        if (!email) {
          const stored = localStorage.getItem("resumeai-preferences");
          if (stored) {
            const prefs = JSON.parse(stored);
            email = prefs.email;
          }
        }

        if (!email) {
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/resumes?email=${encodeURIComponent(email)}`);
        const result = await res.json();
        
        if (result.success && result.data) {
          setResumes(result.data);
        }
      } catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setResumes(resumes.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const filtered = resumes.filter((r) =>
    (r.title || "Untitled Resume").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                My <GradientText variant="blue">Resumes</GradientText>
              </h1>
              <p className="text-gray-400">
                All your resumes in one place — manage, edit, and optimize.
              </p>
            </div>
            <Link href="/builder">
              <GradientButton className="px-6 py-3">
                <Plus className="w-4 h-4" />
                New Resume
              </GradientButton>
            </Link>
          </div>
        </AnimatedSection>

        {/* Toolbar */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5 w-full sm:w-80 border border-white/5 focus-within:border-blue-500/40 transition-all">
              <SearchIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search resumes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full p-0"
              />
            </div>

            <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/5">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">
            {filtered.length} resume{filtered.length !== 1 ? "s" : ""} found
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-blue-400">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            {/* Grid View */}
            {view === "grid" && filtered.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((resume, i) => (
                  <AnimatedSection key={resume.id} delay={0.3 + i * 0.08}>
                    <GlassCard hover className="p-6 flex flex-col gap-4 group">
                      <div className="aspect-[1/1.2] rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <FileText className="w-12 h-12 text-gray-700 group-hover:text-gray-500 transition-colors" />
                        
                        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-sm">
                          <Link href="/builder">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                              title="Edit"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </motion.button>
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(resume.id)}
                            className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-sm mb-1 truncate">{resume.title || "Untitled Resume"}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(resume.updated_at)}
                            <span className="text-gray-700">•</span>
                            <span className="capitalize">{resume.template}</span>
                          </div>
                        </div>
                        <StatusBadge status={resume.status} />
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-gray-500 font-medium">ATS Score</span>
                          <span className={`font-bold ${getScoreColor(resume.ats_score || 0)}`}>{resume.ats_score || 0}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${getScoreBarGradient(resume.ats_score || 0)}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${resume.ats_score || 0}%` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          />
                        </div>
                      </div>
                    </GlassCard>
                  </AnimatedSection>
                ))}
              </div>
            )}

            {/* List View */}
            {view === "list" && filtered.length > 0 && (
              <div className="flex flex-col gap-3">
                {filtered.map((resume, i) => (
                  <AnimatedSection key={resume.id} delay={0.3 + i * 0.06}>
                    <GlassCard hover className="p-5">
                      <div className="flex items-center gap-5">
                        <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-sm truncate">{resume.title || "Untitled Resume"}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(resume.updated_at)}
                            <span className="text-gray-700">•</span>
                            <span className="capitalize">{resume.template}</span>
                          </div>
                        </div>

                        <StatusBadge status={resume.status} />

                        <div className="hidden sm:flex items-center gap-3 w-36">
                          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${getScoreBarGradient(resume.ats_score || 0)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${resume.ats_score || 0}%` }}
                              transition={{ duration: 1, delay: 0.4 + i * 0.08 }}
                            />
                          </div>
                          <span className={`text-xs font-bold ${getScoreColor(resume.ats_score || 0)}`}>{resume.ats_score || 0}%</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Link href="/builder">
                            <button className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all" title="Edit">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleDelete(resume.id)}
                            className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  </AnimatedSection>
                ))}
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 && !loading && (
              <AnimatedSection delay={0.3}>
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                    <SearchIcon className="w-7 h-7 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">No resumes found</h3>
                  <p className="text-sm text-gray-500 mb-6">Set up your email in Settings, or try a different search term.</p>
                  <Link href="/builder">
                    <GradientButton className="px-6 py-3">
                      <Plus className="w-4 h-4" />
                      Create Resume
                    </GradientButton>
                  </Link>
                </div>
              </AnimatedSection>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
