"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye, Download, FileText, ArrowUpRight, ArrowDownRight, Target, Award, Zap, Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import DashboardLayout from "@/components/DashboardLayout";
import GradientText from "@/components/ui/GradientText";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

const weeklyData = [
  { day: "Mon", views: 45, downloads: 12 },
  { day: "Tue", views: 62, downloads: 18 },
  { day: "Wed", views: 38, downloads: 8 },
  { day: "Thu", views: 71, downloads: 22 },
  { day: "Fri", views: 55, downloads: 15 },
  { day: "Sat", views: 30, downloads: 6 },
  { day: "Sun", views: 25, downloads: 4 },
];

const atsBreakdown = [
  { category: "Keywords", score: 92, max: 100 },
  { category: "Formatting", score: 88, max: 100 },
  { category: "Experience", score: 76, max: 100 },
  { category: "Education", score: 95, max: 100 },
  { category: "Skills", score: 70, max: 100 },
];

const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", icon: "text-blue-400" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", icon: "text-emerald-400" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", icon: "text-purple-400" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", icon: "text-orange-400" },
};

interface Resume {
  id: string;
  title: string;
  views: number;
  downloads: number;
  ats_score: number;
  template: string;
}

export default function AnalyticsPage() {
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
        console.error("Error fetching analytics data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const totalViews = resumes.reduce((acc, r) => acc + (r.views || 0), 0);
  const totalDownloads = resumes.reduce((acc, r) => acc + (r.downloads || 0), 0);
  const avgAtsScore = resumes.length > 0 
    ? Math.round(resumes.reduce((acc, r) => acc + (r.ats_score || 0), 0) / resumes.length)
    : 0;
  
  const stats = [
    { label: "Total Views", value: totalViews.toLocaleString(), change: "+0%", up: true, icon: Eye, color: "blue" },
    { label: "Downloads", value: totalDownloads.toLocaleString(), change: "+0%", up: true, icon: Download, color: "emerald" },
    { label: "Avg ATS Score", value: `${avgAtsScore}%`, change: "+0%", up: true, icon: Target, color: "purple" },
    { label: "Active Resumes", value: resumes.length.toString(), change: "+0", up: true, icon: FileText, color: "orange" },
  ];

  const topResumes = [...resumes].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
  const maxViewsChart = Math.max(...weeklyData.map((d) => d.views));

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
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Resume <GradientText variant="blue">Analytics</GradientText>
            </h1>
            <p className="text-gray-400">
              Track performance and optimize your <GradientText variant="gold">career impact</GradientText>.
            </p>
          </div>
        </AnimatedSection>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const c = colorMap[stat.color];
            return (
              <AnimatedSection key={stat.label} delay={0.15 + i * 0.08}>
                <GlassCard hover className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${c.icon}`} />
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-bold ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                      {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                </GlassCard>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Weekly Activity Chart */}
          <AnimatedSection delay={0.4}>
            <GlassCard className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-white text-base">Weekly Activity (Sample)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Views & downloads this week</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-gray-500">Views</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span className="text-gray-500">Downloads</span>
                  </span>
                </div>
              </div>

              {/* Bar chart */}
              <div className="flex items-end gap-3 h-48">
                {weeklyData.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end gap-1 h-40">
                      {/* Views bar */}
                      <motion.div
                        className="flex-1 bg-gradient-to-t from-blue-500/60 to-blue-400/40 rounded-t-md"
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.views / maxViewsChart) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                      />
                      {/* Downloads bar */}
                      <motion.div
                        className="flex-1 bg-gradient-to-t from-purple-500/60 to-purple-400/40 rounded-t-md"
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.downloads / maxViewsChart) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-gray-600">{d.day}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>

          {/* ATS Breakdown */}
          <AnimatedSection delay={0.5}>
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">ATS Breakdown (Sample)</h3>
                  <p className="text-[10px] text-gray-500">Average across all resumes</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {atsBreakdown.map((item, i) => (
                  <div key={item.category}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-gray-400 font-medium">{item.category}</span>
                      <span className="font-bold text-white">{item.score}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          item.score >= 85
                            ? "bg-gradient-to-r from-emerald-500 to-cyan-400"
                            : item.score >= 70
                            ? "bg-gradient-to-r from-yellow-500 to-orange-400"
                            : "bg-gradient-to-r from-red-500 to-orange-400"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>

        {/* Top Performing Resumes */}
        <AnimatedSection delay={0.6}>
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Top Performing Resumes</h3>
                <p className="text-xs text-gray-500">Ranked by total views</p>
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2.5 text-[10px] font-bold text-gray-600 uppercase tracking-wider border-b border-white/5">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Resume</div>
              <div className="col-span-2 text-right">Views</div>
              <div className="col-span-2 text-right">Downloads</div>
              <div className="col-span-2 text-right">ATS Score</div>
            </div>

            {/* Table rows */}
            {topResumes.length === 0 ? (
               <div className="py-8 text-center text-gray-500 text-sm">No resumes to display</div>
            ) : (
              topResumes.map((resume, i) => (
                <motion.div
                  key={resume.id || i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="grid grid-cols-12 gap-4 px-4 py-3.5 items-center border-b border-white/[0.03] last:border-b-0 hover:bg-white/[0.02] transition-colors rounded-lg"
                >
                  <div className="col-span-1">
                    <span className={`text-sm font-bold ${i < 3 ? "text-yellow-400" : "text-gray-600"}`}>
                      {i + 1}
                    </span>
                  </div>
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <span className="text-sm font-semibold text-white truncate">{resume.title || "Untitled Resume"}</span>
                  </div>
                  <div className="col-span-2 text-right text-sm font-medium text-gray-400">{resume.views || 0}</div>
                  <div className="col-span-2 text-right text-sm font-medium text-gray-400">{resume.downloads || 0}</div>
                  <div className="col-span-2 text-right">
                    <span className={`text-sm font-bold ${
                      (resume.ats_score || 0) >= 85 ? "text-emerald-400" : (resume.ats_score || 0) >= 70 ? "text-yellow-400" : "text-red-400"
                    }`}>
                      {resume.ats_score || 0}%
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </GlassCard>
        </AnimatedSection>
      </div>
    </DashboardLayout>
  );
}
