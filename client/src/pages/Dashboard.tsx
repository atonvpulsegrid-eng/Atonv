import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, DollarSign, BarChart3, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dashboardData = {
  kpis: [
    { label: "Total Queries", value: "12,543", change: "+12.5%", icon: Zap, color: "from-blue-500 to-blue-600" },
    { label: "Active Users", value: "2,341", change: "+8.2%", icon: Users, color: "from-purple-500 to-purple-600" },
    { label: "Revenue", value: "$45,231", change: "+23.1%", icon: DollarSign, color: "from-green-500 to-green-600" },
    { label: "Success Rate", value: "94.2%", change: "+2.3%", icon: TrendingUp, color: "from-pink-500 to-pink-600" },
  ],
  barChartData: [
    { name: "Mon", queries: 400, revenue: 2400 },
    { name: "Tue", queries: 300, revenue: 1398 },
    { name: "Wed", queries: 200, revenue: 9800 },
    { name: "Thu", queries: 278, revenue: 3908 },
    { name: "Fri", queries: 189, revenue: 4800 },
    { name: "Sat", queries: 239, revenue: 3800 },
    { name: "Sun", queries: 349, revenue: 4300 },
  ],
  lineChartData: [
    { name: "Week 1", accuracy: 88, latency: 250, cost: 120 },
    { name: "Week 2", accuracy: 89, latency: 240, cost: 115 },
    { name: "Week 3", accuracy: 91, latency: 230, cost: 110 },
    { name: "Week 4", accuracy: 94, latency: 210, cost: 105 },
  ],
  pieChartData: [
    { name: "OpenAI", value: 35 },
    { name: "Gemini", value: 25 },
    { name: "Groq", value: 20 },
    { name: "Perplexity", value: 20 },
  ],
};

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];

const roleViews = {
  agents: {
    title: "Agent Dashboard",
    description: "Real-time query metrics and performance",
  },
  managers: {
    title: "Manager Dashboard",
    description: "Team performance and resource allocation",
  },
  investors: {
    title: "Investor Dashboard",
    description: "Revenue and growth metrics",
  },
};

export default function DashboardPage() {
  const [activeRole, setActiveRole] = useState<"agents" | "managers" | "investors">("agents");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">{roleViews[activeRole].title}</h1>
          <p className="text-gray-400 mb-6">{roleViews[activeRole].description}</p>

          {/* Role Selector */}
          <div className="flex gap-2">
            {(["agents", "managers", "investors"] as const).map((role) => (
              <Button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`${
                  activeRole === role
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-white/5 border border-white/20 text-gray-300 hover:border-white/40"
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* KPI Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {dashboardData.kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">{kpi.label}</p>
                    <h3 className="text-3xl font-bold">{kpi.value}</h3>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${kpi.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-green-400 font-medium">{kpi.change} from last week</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-6 mb-12"
        >
          {/* Bar Chart */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Weekly Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="queries" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-400" />
              Engine Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={dashboardData.pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
        >
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Performance Trends
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dashboardData.lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
              <Line type="monotone" dataKey="latency" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b" }} />
              <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
