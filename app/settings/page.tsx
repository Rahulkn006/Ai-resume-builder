"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Sun, Moon, Monitor, Bell, BellOff,
  Save, FileText, Palette, Shield, ToggleLeft, ToggleRight,
  Check, Sparkles,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GradientText from "@/components/ui/GradientText";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useTheme, Theme } from "@/components/ThemeProvider";

/* ───── Settings types ───── */
interface UserPreferences {
  name: string;
  email: string;
  notifications: boolean;
  autoSave: boolean;
  defaultTemplate: string;
}

const TEMPLATES = [
  { id: "modern", label: "Modern", icon: "✦" },
  { id: "corporate", label: "Corporate", icon: "◆" },
  { id: "tech", label: "Tech", icon: "⬡" },
  { id: "creative", label: "Creative", icon: "◎" },
];

/* ───── Toggle switch component ───── */
function Toggle({ enabled, onToggle, id }: { enabled: boolean; onToggle: () => void; id: string }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`
        relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0
        ${enabled
          ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-[0_0_16px_rgba(59,130,246,0.3)]"
          : "bg-white/10 hover:bg-white/15"
        }
      `}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`
          absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md
          ${enabled ? "left-[26px]" : "left-0.5"}
        `}
      />
    </button>
  );
}

/* ───── Theme option card ───── */
function ThemeOption({
  label,
  value,
  icon: Icon,
  current,
  onSelect,
  preview,
}: {
  label: string;
  value: Theme;
  icon: typeof Sun;
  current: Theme;
  onSelect: (t: Theme) => void;
  preview: string;
}) {
  const isActive = current === value;

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(value)}
      id={`theme-option-${value}`}
      className={`
        relative flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-400 group cursor-pointer
        ${isActive
          ? "bg-white/[0.08] border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]"
        }
      `}
    >
      {/* Selected indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <Check className="w-3.5 h-3.5 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview */}
      <div
        className={`
          w-full aspect-[16/10] rounded-xl border flex items-center justify-center mb-1 transition-all duration-300
          ${preview}
        `}
      >
        <Icon className={`w-8 h-8 ${isActive ? "text-blue-400" : "text-gray-600 group-hover:text-gray-400"} transition-colors`} />
      </div>

      <span className={`text-sm font-semibold transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
        {label}
      </span>
    </motion.button>
  );
}

/* ───── Main Settings Page ───── */
export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const [prefs, setPrefs] = useState<UserPreferences>({
    name: "",
    email: "",
    notifications: true,
    autoSave: true,
    defaultTemplate: "modern",
  });

  const [saved, setSaved] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("resumeai-preferences");
    if (stored) {
      try {
        setPrefs(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  const savePrefs = (updated: UserPreferences) => {
    localStorage.setItem("resumeai-preferences", JSON.stringify(updated));
    setPrefs(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveProfile = () => {
    localStorage.setItem("resumeai-preferences", JSON.stringify(prefs));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Page Header */}
        <AnimatedSection delay={0.1}>
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Account <GradientText variant="blue">Settings</GradientText>
            </h1>
            <p className="text-gray-400">
              Customize your <GradientText variant="gold">Experience</GradientText> and manage preferences.
            </p>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-8">

          {/* ═══════ PROFILE SECTION ═══════ */}
          <AnimatedSection delay={0.2}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Profile</h2>
                  <p className="text-xs text-gray-500">Manage your personal information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="settings-name" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input
                      id="settings-name"
                      type="text"
                      value={prefs.name}
                      onChange={(e) => setPrefs({ ...prefs, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="settings-email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input
                      id="settings-email"
                      type="email"
                      value={prefs.email}
                      onChange={(e) => setPrefs({ ...prefs, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <GradientButton onClick={saveProfile} className="px-6 py-2.5">
                  <AnimatePresence mode="wait">
                    {profileSaved ? (
                      <motion.span key="saved" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Saved
                      </motion.span>
                    ) : (
                      <motion.span key="save" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Profile
                      </motion.span>
                    )}
                  </AnimatePresence>
                </GradientButton>
              </div>
            </GlassCard>
          </AnimatedSection>

          {/* ═══════ APPEARANCE SECTION ═══════ */}
          <AnimatedSection delay={0.3}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Appearance</h2>
                  <p className="text-xs text-gray-500">Choose how ResumeAI looks for you</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ThemeOption
                  label="Light Mode"
                  value="light"
                  icon={Sun}
                  current={theme}
                  onSelect={setTheme}
                  preview="bg-white/20 border-white/10"
                />
                <ThemeOption
                  label="Dark Mode"
                  value="dark"
                  icon={Moon}
                  current={theme}
                  onSelect={setTheme}
                  preview="bg-black/30 border-white/5"
                />
                <ThemeOption
                  label="System"
                  value="system"
                  icon={Monitor}
                  current={theme}
                  onSelect={setTheme}
                  preview="bg-gradient-to-r from-white/20 to-black/30 border-white/5"
                />
              </div>
            </GlassCard>
          </AnimatedSection>

          {/* ═══════ PREFERENCES SECTION ═══════ */}
          <AnimatedSection delay={0.4}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Preferences</h2>
                  <p className="text-xs text-gray-500">Fine-tune your workflow settings</p>
                </div>
              </div>

              <div className="flex flex-col divide-y divide-white/5">
                {/* Notifications */}
                <div className="flex items-center justify-between py-5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      {prefs.notifications ? (
                        <Bell className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <BellOff className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Notifications</p>
                      <p className="text-xs text-gray-500">Get notified about ATS score updates & tips</p>
                    </div>
                  </div>
                  <Toggle
                    id="toggle-notifications"
                    enabled={prefs.notifications}
                    onToggle={() => {
                      const updated = { ...prefs, notifications: !prefs.notifications };
                      savePrefs(updated);
                    }}
                  />
                </div>

                {/* Auto-Save */}
                <div className="flex items-center justify-between py-5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <Save className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Auto-Save</p>
                      <p className="text-xs text-gray-500">Automatically save resumes while editing</p>
                    </div>
                  </div>
                  <Toggle
                    id="toggle-autosave"
                    enabled={prefs.autoSave}
                    onToggle={() => {
                      const updated = { ...prefs, autoSave: !prefs.autoSave };
                      savePrefs(updated);
                    }}
                  />
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>

          {/* ═══════ DEFAULT TEMPLATE SECTION ═══════ */}
          <AnimatedSection delay={0.5}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Default Template</h2>
                  <p className="text-xs text-gray-500">Choose your starting template for new resumes</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TEMPLATES.map((tpl) => {
                  const isActive = prefs.defaultTemplate === tpl.id;
                  return (
                    <motion.button
                      key={tpl.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      id={`template-${tpl.id}`}
                      onClick={() => {
                        const updated = { ...prefs, defaultTemplate: tpl.id };
                        savePrefs(updated);
                      }}
                      className={`
                        relative flex flex-col items-center gap-3 py-5 px-4 rounded-xl border transition-all duration-300
                        ${isActive
                          ? "bg-white/[0.08] border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1]"
                        }
                      `}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute top-2 right-2 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className="text-2xl">{tpl.icon}</span>
                      <span className={`text-xs font-semibold ${isActive ? "text-white" : "text-gray-500"}`}>
                        {tpl.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </GlassCard>
          </AnimatedSection>

          {/* Save confirmation toast */}
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold shadow-2xl shadow-blue-500/30"
              >
                <Sparkles className="w-4 h-4" />
                Preferences saved successfully
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
