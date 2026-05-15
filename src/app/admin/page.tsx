"use client";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Shield, Users, Settings, FileText, Download, Eye } from "lucide-react";

type Tab = "audit" | "users" | "settings";

const auditLogs = [
  { id: 1, event: "User Login", user: "admin@atonv.com", role: "admin", timestamp: "2026-05-15 10:23:45", ip: "192.168.1.1" },
  { id: 2, event: "Lead Created", user: "sarah@atonv.com", role: "agent", timestamp: "2026-05-15 10:18:32", ip: "192.168.1.5" },
  { id: 3, event: "Report Exported", user: "mike@atonv.com", role: "manager", timestamp: "2026-05-15 09:55:12", ip: "192.168.1.3" },
  { id: 4, event: "Connector Enabled", user: "admin@atonv.com", role: "admin", timestamp: "2026-05-15 09:42:08", ip: "192.168.1.1" },
  { id: 5, event: "Dashboard Viewed", user: "investor@fund.com", role: "investor", timestamp: "2026-05-15 09:30:00", ip: "10.0.0.5" },
  { id: 6, event: "AI Query Sent", user: "sarah@atonv.com", role: "agent", timestamp: "2026-05-15 09:15:22", ip: "192.168.1.5" },
  { id: 7, event: "Settings Updated", user: "admin@atonv.com", role: "admin", timestamp: "2026-05-15 08:50:11", ip: "192.168.1.1" },
  { id: 8, event: "User Invited", user: "mike@atonv.com", role: "manager", timestamp: "2026-05-14 17:30:45", ip: "192.168.1.3" },
];

const users = [
  { id: 1, name: "Admin User", email: "admin@atonv.com", role: "admin", status: "active", lastLogin: "2026-05-15" },
  { id: 2, name: "Sarah Johnson", email: "sarah@atonv.com", role: "agent", status: "active", lastLogin: "2026-05-15" },
  { id: 3, name: "Mike Chen", email: "mike@atonv.com", role: "manager", status: "active", lastLogin: "2026-05-15" },
  { id: 4, name: "Emily Davis", email: "emily@atonv.com", role: "agent", status: "active", lastLogin: "2026-05-14" },
  { id: 5, name: "Investor Fund", email: "investor@fund.com", role: "investor", status: "active", lastLogin: "2026-05-15" },
  { id: 6, name: "Tom Brown", email: "tom@atonv.com", role: "agent", status: "inactive", lastLogin: "2026-05-01" },
];

const roleColors: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  agent: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  manager: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  investor: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("audit");

  const tabs: { id: Tab; label: string; icon: typeof Shield }[] = [
    { id: "audit", label: "Audit Logs", icon: FileText },
    { id: "users", label: "User Management", icon: Users },
    { id: "settings", label: "System Settings", icon: Settings },
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Admin <span className="gradient-text">Panel</span></h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Enterprise-grade control panel for compliance and operations.</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${tab === t.id ? "gradient-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                <t.icon className="w-4 h-4" />{t.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Audit Logs */}
        {tab === "audit" && (
          <AnimatedSection>
            <div className="card-glass overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold">Recent Audit Logs</h3>
                <button className="btn-secondary !px-3 !py-1.5 text-xs inline-flex items-center gap-1"><Download className="w-3 h-3" /> Export CSV</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <th className="text-left p-3 font-semibold">Event</th>
                    <th className="text-left p-3 font-semibold hidden sm:table-cell">User</th>
                    <th className="text-left p-3 font-semibold hidden md:table-cell">Role</th>
                    <th className="text-left p-3 font-semibold">Timestamp</th>
                    <th className="text-left p-3 font-semibold hidden lg:table-cell">IP Address</th>
                  </tr></thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <td className="p-3 font-medium">{log.event}</td>
                        <td className="p-3 hidden sm:table-cell text-gray-600 dark:text-gray-400">{log.user}</td>
                        <td className="p-3 hidden md:table-cell"><span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${roleColors[log.role]}`}>{log.role}</span></td>
                        <td className="p-3 text-gray-600 dark:text-gray-400 text-xs">{log.timestamp}</td>
                        <td className="p-3 hidden lg:table-cell text-gray-500 font-mono text-xs">{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* User Management */}
        {tab === "users" && (
          <AnimatedSection>
            <div className="grid sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Users", value: users.length.toString(), color: "from-indigo-500 to-purple-500" },
                { label: "Admins", value: users.filter((u) => u.role === "admin").length.toString(), color: "from-purple-500 to-pink-500" },
                { label: "Agents", value: users.filter((u) => u.role === "agent").length.toString(), color: "from-blue-500 to-cyan-500" },
                { label: "Active", value: users.filter((u) => u.status === "active").length.toString(), color: "from-green-500 to-emerald-500" },
              ].map((s) => (
                <div key={s.label} className="card-glass p-4 text-center">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="card-glass overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold">All Users</h3>
                <div className="flex gap-2">
                  <button className="btn-secondary !px-3 !py-1.5 text-xs inline-flex items-center gap-1"><Download className="w-3 h-3" /> CSV</button>
                  <button className="btn-secondary !px-3 !py-1.5 text-xs inline-flex items-center gap-1"><Download className="w-3 h-3" /> PDF</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <th className="text-left p-3 font-semibold">Name</th>
                    <th className="text-left p-3 font-semibold hidden sm:table-cell">Email</th>
                    <th className="text-left p-3 font-semibold">Role</th>
                    <th className="text-left p-3 font-semibold hidden md:table-cell">Status</th>
                    <th className="text-left p-3 font-semibold hidden lg:table-cell">Last Login</th>
                  </tr></thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <td className="p-3 font-medium">{u.name}</td>
                        <td className="p-3 hidden sm:table-cell text-gray-600 dark:text-gray-400">{u.email}</td>
                        <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${roleColors[u.role]}`}>{u.role}</span></td>
                        <td className="p-3 hidden md:table-cell"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>{u.status}</span></td>
                        <td className="p-3 hidden lg:table-cell text-gray-600 dark:text-gray-400">{u.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* System Settings */}
        {tab === "settings" && (
          <AnimatedSection>
            <div className="space-y-4">
              {[
                { title: "Auto-Export Reports", desc: "Automatically generate and email weekly investor reports", enabled: true },
                { title: "Real-time Metrics", desc: "Enable WebSocket-based real-time dashboard updates", enabled: true },
                { title: "Audit Logging", desc: "Log all user actions for compliance and security", enabled: true },
                { title: "Two-Factor Authentication", desc: "Require 2FA for all admin and investor accounts", enabled: false },
                { title: "API Rate Limiting", desc: "Limit API requests to prevent abuse (1000 req/min)", enabled: true },
                { title: "Dark Mode Default", desc: "Set dark mode as the default theme for new users", enabled: false },
              ].map((s) => (
                <div key={s.title} className="card-glass p-5 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{s.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
                  </div>
                  <button className={`relative w-12 h-6 rounded-full transition-colors ${s.enabled ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${s.enabled ? "translate-x-6" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
