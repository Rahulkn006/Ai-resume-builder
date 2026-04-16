"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Plus, BarChart3, Clock, FolderOpen, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
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

export default function DashboardPage() {
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

        if (!email) return;

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

  const totalResumes = resumes.length;
  const avgAtsScore = totalResumes > 0 
    ? Math.round(resumes.reduce((acc, r) => acc + (r.ats_score || 0), 0) / totalResumes)
    : 0;
  
  // Find the most recently updated resume
  const lastEdited = totalResumes > 0
    ? resumes.reduce((latest, r) => new Date(r.updated_at) > new Date(latest.updated_at) ? r : latest)
    : null;
  const lastEditedStr = lastEdited ? formatTimeAgo(lastEdited.updated_at) : "N/A";

  const recentResumes = [...resumes]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 3);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full text-blue-400 py-20">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Your <GradientText variant="gold">Resume</GradientText> Dashboard
              </h1>
              <p className="text-gray-400">Manage, create, and optimize your resumes with AI.</p>
            </div>
            <Link href="/builder">
              <GradientButton className="px-6 py-3">
                <Plus className="w-4 h-4" />
                Create New Resume
              </GradientButton>
            </Link>
          </div>
        </AnimatedSection>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <AnimatedSection delay={0.2}>
            <GlassCard hover className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{totalResumes}</p>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Resumes</p>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <GlassCard hover className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{avgAtsScore}</p>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Avg ATS Score</p>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <GlassCard hover className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-black text-white">{lastEditedStr}</p>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Edited</p>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>

        {/* Recent Resumes */}
        <AnimatedSection delay={0.5}>
          <h2 className="text-xl font-bold text-white mb-6">
            Recent <GradientText variant="blue">Resumes</GradientText>
          </h2>
        </AnimatedSection>

        {recentResumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentResumes.map((resume, i) => (
              <AnimatedSection key={resume.id} delay={0.6 + i * 0.1}>
                <GlassCard hover className="p-6 flex flex-col gap-5">
                  {/* Preview placeholder */}
                  <div className="aspect-[1/1.2] rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <FileText className="w-12 h-12 text-gray-700 group-hover:text-gray-600 transition-colors" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm mb-1">{resume.title || "Untitled Resume"}</h3>
                    <p className="text-xs text-gray-500 capitalize">{resume.template} template • {formatTimeAgo(resume.updated_at)}</p>
                  </div>

                  {/* ATS Score bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-500 font-medium">ATS Score</span>
                      <span className="font-bold text-white">{resume.ats_score || 0}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${resume.ats_score || 0}%` }}
                        transition={{ duration: 1, delay: 0.8 + i * 0.15 }}
                      />
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection delay={0.6}>
             <div className="py-12 bg-white/5 border border-white/10 rounded-xl text-center">
                <p className="text-gray-400 mb-4">No resumes found. Set up your email in Settings, or create a new one.</p>
                <Link href="/builder">
                  <GradientButton className="px-6 py-3 mx-auto">
                    Create your first resume
                  </GradientButton>
                </Link>
             </div>
          </AnimatedSection>
        )}
      </div>
    </DashboardLayout>
  );
}
