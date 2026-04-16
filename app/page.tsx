"use client";

import Link from "next/link";
import { FileText, Sparkles, BarChart3, Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import GradientText from "@/components/ui/GradientText";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Home() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/[0.07] blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-purple-500/[0.05] blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-yellow-500/[0.03] blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 md:px-16 py-5 border-b border-white/[0.06]">
        <AnimatedSection delay={0} direction="down">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Resume<GradientText variant="blue">AI</GradientText>
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} direction="down">
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-gray-500">
            <Link href="/dashboard" className="hover:text-white transition-colors duration-300">Dashboard</Link>
            <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
            <a href="#stats" className="hover:text-white transition-colors duration-300">Performance</a>
            <a href="#cta" className="hover:text-white transition-colors duration-300">Get Started</a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} direction="down">
          <Link href="/builder">
            <GradientButton variant="primary" className="px-6 py-2.5 text-sm rounded-full">
              Get Started
            </GradientButton>
          </Link>
        </AnimatedSection>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10">
        <div className="max-w-5xl mx-auto px-8 pt-32 pb-24 text-center">
          {/* Badge */}
          <AnimatedSection delay={0.1}>
            <div className="flex justify-center mb-8">
              <Badge>AI-Powered Resume Intelligence</Badge>
            </div>
          </AnimatedSection>

          {/* Main Heading — clear hierarchy, tight tracking */}
          <AnimatedSection delay={0.2}>
            <h1 className="text-[3.5rem] md:text-[5rem] leading-[1.05] font-extrabold tracking-[-0.04em] mb-6 text-white">
              Build your perfect
              <br />
              <GradientText variant="gold">Resume</GradientText>
            </h1>
          </AnimatedSection>

          {/* Subtext — generous line-height, muted color */}
          <AnimatedSection delay={0.3}>
            <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-16 leading-[1.8] font-normal">
              The professional&apos;s choice for ATS-optimized resumes.
              Powered by high-performance AI to land you the role you deserve.
            </p>
          </AnimatedSection>

          {/* Login Card */}
          <AnimatedSection delay={0.4}>
            <div className="max-w-sm mx-auto">
              <GlassCard className="p-8">
                <h2 className="text-lg font-bold text-white mb-1 tracking-tight">Welcome back</h2>
                <p className="text-gray-500 text-[13px] mb-8 leading-relaxed">Sign in to access your saved resumes and performance data</p>

                <motion.button
                  onClick={signInWithGoogle}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 text-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </motion.button>

                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[11px] text-gray-600 font-medium uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <Link href="/builder" className="block">
                  <GradientButton className="w-full py-3.5 rounded-xl text-sm">
                    Start Building Free
                    <ArrowRight className="w-4 h-4" />
                  </GradientButton>
                </Link>
              </GlassCard>
            </div>
          </AnimatedSection>

          {/* Trust indicator */}
          <AnimatedSection delay={0.5}>
            <div className="flex items-center justify-center gap-3 mt-12">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0b1220] bg-gradient-to-br from-blue-500/30 to-purple-500/30" />
                ))}
              </div>
              <span className="text-[13px] font-medium text-gray-600">Trusted by 2,000+ professionals</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-5xl mx-auto px-8 pb-32">
        <AnimatedSection delay={0.1}>
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4">What we offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Why Choose <GradientText variant="blue">ResumeAI</GradientText>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-[15px] leading-relaxed">
              Everything you need to create a job-winning resume, powered by cutting-edge AI.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: Sparkles,
              title: "AI Precision",
              description: "Engineered prompts that transform raw experience into professional excellence.",
              gradient: "from-yellow-400 to-orange-500",
            },
            {
              icon: BarChart3,
              title: "ATS Mastery",
              description: "Strategic keyword placement ensuring your resume clears every digital gatekeeper.",
              gradient: "from-blue-400 to-purple-500",
            },
            {
              icon: Download,
              title: "Elite Export",
              description: "Premium PDF layouts that look stunning on screens and high-end print.",
              gradient: "from-emerald-400 to-cyan-500",
            },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection key={i} delay={0.2 + i * 0.1}>
                <GlassCard hover className="p-7 group">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-[13px]">{feature.description}</p>
                </GlassCard>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Stats Strip */}
      <section id="stats" className="relative z-10 border-y border-white/[0.04] py-20">
        <div className="max-w-4xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
              {[
                { stat: "98%", label: "Placement Rate" },
                { stat: "Premium", label: "Sector Layouts" },
                { stat: "Real-time", label: "ATS Feedback" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
                    <GradientText variant="gold">{item.stat}</GradientText>
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.2em] text-gray-600 uppercase">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative z-10 max-w-4xl mx-auto px-8 py-32">
        <AnimatedSection>
          <GlassCard className="p-12 md:p-16 text-center relative overflow-hidden">
            {/* Ambient glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[60px] -ml-24 -mb-24 pointer-events-none" />

            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-400 mb-5">Get started today</p>
              <h2 className="text-3xl md:text-[2.75rem] font-bold mb-5 text-white tracking-tight leading-tight">
                Ready to land your <GradientText variant="gold">dream role</GradientText>?
              </h2>
              <p className="text-gray-500 mb-10 max-w-md mx-auto text-[15px] leading-relaxed">
                Don&apos;t leave your next career move to chance. Use the tools built for elite candidates.
              </p>
              <Link href="/builder">
                <GradientButton className="px-10 py-4 rounded-2xl text-base">
                  Start Building
                  <ArrowRight className="w-5 h-5" />
                </GradientButton>
              </Link>
            </div>
          </GlassCard>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-10">
        <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">ResumeAI</span>
          </div>
          <div className="flex gap-8 text-[13px] font-medium text-gray-600">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
          </div>
          <p className="text-[13px] text-gray-700">&copy; {new Date().getFullYear()} ResumeAI</p>
        </div>
      </footer>
    </div>
  );
}