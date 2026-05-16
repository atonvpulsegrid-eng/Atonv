import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Lead {
  id: number;
  company: string;
  contact: string;
  email: string;
  status: "active" | "pending" | "lost";
  value: number;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, company: "Acme Corp", contact: "John Doe", email: "john@acme.com", status: "active", value: 50000 },
    { id: 2, company: "Tech Inc", contact: "Jane Smith", email: "jane@techinc.com", status: "pending", value: 30000 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending" | "lost">("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{ company: string; contact: string; email: string; status: "active" | "pending" | "lost"; value: number }>({
    company: "",
    contact: "",
    email: "",
    status: "pending",
    value: 0,
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    if (editingId) {
      setLeads(leads.map((l) => (l.id === editingId ? { ...l, ...formData } : l)));
      setEditingId(null);
    } else {
      setLeads([...leads, { id: Date.now(), ...formData, value: parseInt(formData.value.toString()) }]);
    }
    setFormData({ company: "", contact: "", email: "", status: "pending", value: 0 });
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setLeads(leads.filter((l) => l.id !== id));
  };

  const statusColors = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    lost: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Lead Management</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white"
              />
            </div>
            <Button
              onClick={() => {
                setFormData({ company: "", contact: "", email: "", status: "pending", value: 0 });
                setEditingId(null);
                setIsAddModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Lead
            </Button>
          </div>
          <div className="flex gap-2 mt-4">
            {(["all", "active", "pending", "lost"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === status
                    ? "bg-blue-500 text-white"
                    : "bg-white/5 border border-white/20 text-gray-300 hover:border-white/40"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-2xl font-bold mb-2">No leads found</h3>
            <p className="text-gray-400 mb-8">Start by adding your first lead to the system</p>
            <Button
              onClick={() => {
                setFormData({ company: "", contact: "", email: "", status: "pending", value: 0 });
                setEditingId(null);
                setIsAddModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Your First Lead
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredLeads.map((lead, idx) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{lead.company}</h3>
                    <p className="text-sm text-gray-400 mb-1">{lead.contact}</p>
                    <p className="text-sm text-gray-400 mb-3">{lead.email}</p>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[lead.status]}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                      <span className="text-sm font-semibold text-blue-400">${lead.value.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setFormData({ ...lead });
                        setEditingId(lead.id);
                        setIsAddModalOpen(true);
                      }}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-white/20 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingId ? "Edit Lead" : "Add Lead"}</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">Company</label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">Contact</label>
                <Input
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">Value</label>
                <Input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 border-white/20 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
              >
                {editingId ? "Update" : "Add"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
