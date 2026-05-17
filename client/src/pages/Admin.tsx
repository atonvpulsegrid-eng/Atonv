import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Trash2, Edit2, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const auditLogs = [
  { id: 1, user: "john@example.com", action: "Login", timestamp: "2024-05-16 10:30 AM", status: "success" },
  { id: 2, user: "jane@example.com", action: "Updated Lead", timestamp: "2024-05-16 10:25 AM", status: "success" },
  { id: 3, user: "admin@example.com", action: "Modified User Role", timestamp: "2024-05-16 10:20 AM", status: "success" },
  { id: 4, user: "bob@example.com", action: "Failed Login", timestamp: "2024-05-16 10:15 AM", status: "error" },
  { id: 5, user: "alice@example.com", action: "Exported Report", timestamp: "2024-05-16 10:10 AM", status: "success" },
];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "user", status: "active", queries: 1234 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "manager", status: "active", queries: 5678 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user", status: "inactive", queries: 234 },
  { id: 4, name: "Alice Williams", email: "alice@example.com", role: "admin", status: "active", queries: 9876 },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "user", status: "active", queries: 456 },
];

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("audit");

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const csv = [
      ["ID", "User", "Action", "Timestamp", "Status"],
      ...auditLogs.map((log) => [log.id, log.user, log.action, log.timestamp, log.status]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_logs.csv";
    a.click();
  };

  const handleExportPDF = () => {
    alert("PDF export functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Shield className="w-8 h-8 text-blue-400" />
                Admin Panel
              </h1>
              <p className="text-gray-400 mt-2">System administration and monitoring</p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-white/10 border border-white/20 hover:border-white/40">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Search */}
          <Input
            type="text"
            placeholder="Search logs or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-fit grid-cols-3 bg-white/10 border border-white/20">
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex gap-2 mb-6">
                <Button
                  onClick={handleExportCSV}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button
                  onClick={handleExportPDF}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/20">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Timestamp</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log, idx) => (
                      <motion.tr
                        key={log.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm">{log.user}</td>
                        <td className="px-6 py-4 text-sm">{log.action}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{log.timestamp}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              log.status === "success"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-white/20">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Queries</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, idx) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-red-500/20 text-red-400"
                                : user.role === "manager"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{user.queries.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4 text-blue-400" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  General Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform Name</label>
                    <Input
                      type="text"
                      defaultValue="ATONV Platform"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Support Email</label>
                    <Input
                      type="email"
                      defaultValue="support@atonv.ai"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">API Rate Limit (requests/min)</label>
                    <Input
                      type="number"
                      defaultValue="1000"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400">Require 2FA for all admin users</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <p className="font-medium">IP Whitelist</p>
                      <p className="text-sm text-gray-400">Restrict admin access to specific IPs</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-gray-400">Auto-logout after 30 minutes of inactivity</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  Save Changes
                </Button>
                <Button className="bg-white/10 border border-white/20 hover:border-white/40">Reset</Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
