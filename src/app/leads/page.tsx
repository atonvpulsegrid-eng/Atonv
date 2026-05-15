"use client";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Search, Plus, Filter, Edit2, Trash2, X, Users } from "lucide-react";

type LeadStatus = "active" | "pending" | "lost";
interface Lead { id: number; name: string; email: string; company: string; status: LeadStatus; score: number; lastContact: string; }

const statusColors: Record<LeadStatus, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  lost: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

const initialLeads: Lead[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@acme.com", company: "Acme Corp", status: "active", score: 92, lastContact: "2026-05-14" },
  { id: 2, name: "Mike Chen", email: "mike@techstart.io", company: "TechStart Inc", status: "pending", score: 75, lastContact: "2026-05-12" },
  { id: 3, name: "Emily Davis", email: "emily@global.co", company: "Global Solutions", status: "active", score: 88, lastContact: "2026-05-13" },
  { id: 4, name: "James Wilson", email: "james@dataflow.com", company: "DataFlow Ltd", status: "lost", score: 45, lastContact: "2026-05-01" },
  { id: 5, name: "Lisa Park", email: "lisa@innovate.ai", company: "Innovate AI", status: "active", score: 95, lastContact: "2026-05-15" },
  { id: 6, name: "Tom Brown", email: "tom@nexgen.com", company: "NexGen Corp", status: "pending", score: 68, lastContact: "2026-05-10" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");
  const [showModal, setShowModal] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", status: "pending" as LeadStatus, score: 50 });

  const filtered = leads.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => { setEditLead(null); setForm({ name: "", email: "", company: "", status: "pending", score: 50 }); setShowModal(true); };
  const openEdit = (l: Lead) => { setEditLead(l); setForm({ name: l.name, email: l.email, company: l.company, status: l.status, score: l.score }); setShowModal(true); };
  const save = () => {
    if (!form.name || !form.email) return;
    if (editLead) {
      setLeads(leads.map((l) => l.id === editLead.id ? { ...l, ...form, lastContact: new Date().toISOString().split("T")[0] } : l));
    } else {
      setLeads([...leads, { id: Date.now(), ...form, lastContact: new Date().toISOString().split("T")[0] }]);
    }
    setShowModal(false);
  };
  const remove = (id: number) => setLeads(leads.filter((l) => l.id !== id));

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Lead <span className="gradient-text">Management</span></h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Track, nurture, and close your leads with AI intelligence.</p>
            </div>
            <button onClick={openAdd} className="btn-primary inline-flex items-center gap-2 self-start"><Plus className="w-4 h-4" /> Add Lead</button>
          </div>
        </AnimatedSection>

        {/* Search & Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search leads by name, email, or company..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
            </div>
            <div className="flex gap-2">
              {(["all", "active", "pending", "lost"] as const).map((s) => (
                <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filterStatus === s ? "gradient-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Table */}
        <AnimatedSection delay={0.2}>
          {filtered.length === 0 ? (
            <div className="card-glass p-12 text-center">
              <Users className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No leads found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">{leads.length === 0 ? "Click \"Add Lead\" to start building your pipeline." : "Try adjusting your search or filter."}</p>
              {leads.length === 0 && <button onClick={openAdd} className="btn-primary inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Add Your First Lead</button>}
            </div>
          ) : (
            <div className="card-glass overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left p-4 font-semibold">Name</th>
                      <th className="text-left p-4 font-semibold hidden sm:table-cell">Company</th>
                      <th className="text-left p-4 font-semibold hidden md:table-cell">Email</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold hidden lg:table-cell">Score</th>
                      <th className="text-left p-4 font-semibold hidden lg:table-cell">Last Contact</th>
                      <th className="text-right p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((l) => (
                      <tr key={l.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{l.name[0]}</div>
                            <span className="font-medium">{l.name}</span>
                          </div>
                        </td>
                        <td className="p-4 hidden sm:table-cell text-gray-600 dark:text-gray-400">{l.company}</td>
                        <td className="p-4 hidden md:table-cell text-gray-600 dark:text-gray-400">{l.email}</td>
                        <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[l.status]}`}>{l.status}</span></td>
                        <td className="p-4 hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${l.score >= 80 ? "bg-green-500" : l.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${l.score}%` }} />
                            </div>
                            <span className="text-xs text-gray-500">{l.score}</span>
                          </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell text-gray-600 dark:text-gray-400">{l.lastContact}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => openEdit(l)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Edit2 className="w-4 h-4 text-gray-500" /></button>
                            <button onClick={() => remove(l.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 className="w-4 h-4 text-red-500" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </AnimatedSection>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="card-glass p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{editLead ? "Edit Lead" : "Add New Lead"}</h2>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as LeadStatus })} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lead Score: {form.score}</label>
                  <input type="range" min="0" max="100" value={form.score} onChange={(e) => setForm({ ...form, score: Number(e.target.value) })} className="w-full" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button onClick={save} className="btn-primary flex-1">{editLead ? "Update" : "Add Lead"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
