"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, Home, FolderOpen, BarChart3, Settings, LogOut, Search, Bell, Sun, Moon } from "lucide-react";
import GradientText from "@/components/ui/GradientText";
import { useTheme } from "@/components/ThemeProvider";
import { ReactNode } from "react";
import { supabase } from "@/lib/supabase";

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: FolderOpen, label: "My Resumes", href: "/resumes" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme, theme } = useTheme();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/5 dark:border-white/5 bg-white/[0.02] dark:bg-white/[0.02] backdrop-blur-sm p-6 relative z-20">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Resume<GradientText variant="blue">AI</GradientText>
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  isActive
                    ? "bg-white/[0.08] text-white border-l-2 border-blue-500"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? "text-blue-400" : "text-gray-600 group-hover:text-gray-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick Theme Toggle */}
        <div className="pb-4">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-all w-full group"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-4.5 h-4.5 text-gray-600 group-hover:text-yellow-400 transition-colors" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-gray-600 group-hover:text-blue-400 transition-colors" />
            )}
            {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/5">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-all w-full"
          >
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2.5 w-80">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search resumes..." className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full p-0" />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              U
            </div>
          </div>
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
