import Link from "next/link";
import { FileText, Sparkles, BarChart3, Download, ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white overflow-hidden">

      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-white/[0.03] backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">ResumeAI</span>
        </div>
        <Link href="/builder">
          <button className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-500/25">
            Get Started
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10">
        <div className="max-w-5xl mx-auto px-8 pt-28 pb-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI-Powered Resume Optimization
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Build resumes that
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-teal-400">
              land interviews
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Craft ATS-optimized, professional resumes in minutes with AI.
            Choose from premium templates, get instant scoring, and export perfect PDFs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builder">
              <button className="group flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-all duration-200 shadow-xl shadow-indigo-500/30 cursor-pointer">
                Build My Resume
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <span className="text-sm text-slate-500">No sign-up required • 100% free</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Sparkles,
              title: "AI Content Optimization",
              description: "Automatically rewrite and enhance your experience bullets for maximum professional impact.",
              gradient: "from-amber-500 to-orange-400",
              glow: "shadow-amber-500/20",
              iconBg: "bg-amber-500/10 border-amber-500/20 text-amber-400"
            },
            {
              icon: BarChart3,
              title: "ATS Score Analysis",
              description: "Get real-time ATS compatibility scores with keyword analysis and actionable suggestions.",
              gradient: "from-indigo-500 to-blue-400",
              glow: "shadow-indigo-500/20",
              iconBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
            },
            {
              icon: Download,
              title: "One-Click PDF Export",
              description: "Download pixel-perfect, print-ready PDF resumes from any of our professional templates.",
              gradient: "from-emerald-500 to-teal-400",
              glow: "shadow-emerald-500/20",
              iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className={`bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] p-8 hover:bg-white/[0.07] hover:shadow-2xl ${feature.glow} transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${feature.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative z-10 border-t border-b border-white/[0.06] bg-white/[0.02] py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-10">Why professionals choose ResumeAI</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { stat: "95%+", label: "ATS Pass Rate" },
              { stat: "4 Premium", label: "Templates" },
              { stat: "< 5 min", label: "To Build" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 mb-1">{item.stat}</div>
                <div className="text-sm text-slate-500 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-24">
        <div className="relative bg-gradient-to-br from-indigo-600/30 to-cyan-600/20 rounded-3xl p-10 md:p-14 text-center border border-indigo-400/10 overflow-hidden">
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to stand out?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Join thousands of job seekers who landed their dream roles with AI-optimized resumes.
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-sm">
              {["ATS-optimized", "AI-enhanced writing", "Professional templates", "Instant PDF export"].map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  {item}
                </span>
              ))}
            </div>
            <Link href="/builder">
              <button className="group bg-gradient-to-r from-indigo-500 to-cyan-400 text-white px-8 py-4 rounded-xl text-base font-bold hover:opacity-90 transition-all duration-200 cursor-pointer inline-flex items-center gap-2 shadow-xl shadow-indigo-500/30">
                Start Building Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8">
        <div className="max-w-5xl mx-auto px-8 flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium text-slate-400">ResumeAI</span>
          </div>
          <span>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}