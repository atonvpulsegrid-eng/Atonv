"use client";
import { useState, useEffect } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { TrendingUp, Users, Zap, DollarSign, Activity } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler } from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler);

const roles = ["Agent", "Manager", "Investor"] as const;
type Role = typeof roles[number];

const kpiData: Record<Role, { title: string; value: string; change: string; positive: boolean; icon: typeof TrendingUp }[]> = {
  Agent: [
    { title: "Active Leads", value: "142", change: "+12%", positive: true, icon: Users },
    { title: "Queries Today", value: "89", change: "+8%", positive: true, icon: Zap },
    { title: "Conversion Rate", value: "24%", change: "+3%", positive: true, icon: TrendingUp },
    { title: "Avg Response", value: "0.8s", change: "-15%", positive: true, icon: Activity },
  ],
  Manager: [
    { title: "Total Users", value: "1,247", change: "+18%", positive: true, icon: Users },
    { title: "Revenue", value: "$48.2K", change: "+22%", positive: true, icon: DollarSign },
    { title: "Active Leads", value: "342", change: "+15%", positive: true, icon: TrendingUp },
    { title: "Team Efficiency", value: "94%", change: "+5%", positive: true, icon: Activity },
  ],
  Investor: [
    { title: "MRR", value: "$127K", change: "+28%", positive: true, icon: DollarSign },
    { title: "Total Users", value: "12,847", change: "+34%", positive: true, icon: Users },
    { title: "Growth Rate", value: "42%", change: "+8%", positive: true, icon: TrendingUp },
    { title: "Retention", value: "96%", change: "+2%", positive: true, icon: Activity },
  ],
};

export default function DashboardPage() {
  const [role, setRole] = useState<Role>("Manager");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const doughnutData = {
    labels: ["OpenAI", "Gemini", "Groq", "Perplexity"],
    datasets: [{
      data: [35, 28, 22, 15],
      backgroundColor: ["#6366f1", "#8b5cf6", "#a855f7", "#c084fc"],
      borderWidth: 0,
    }],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Queries",
      data: [120, 190, 150, 220, 280, 160, 140],
      backgroundColor: "rgba(99, 102, 241, 0.8)",
      borderRadius: 8,
    }],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Revenue",
      data: [30, 45, 58, 72, 95, 127],
      borderColor: "#6366f1",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      fill: true,
      tension: 0.4,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#9ca3af" } },
      y: { grid: { color: "rgba(156, 163, 175, 0.1)" }, ticks: { color: "#9ca3af" } },
    },
  };

  if (!mounted) return null;

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Analytics <span className="gradient-text">Dashboard</span></h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time metrics and insights for your business.</p>
            </div>
            <div className="flex gap-2">
              {roles.map((r) => (
                <button key={r} onClick={() => setRole(r)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${role === r ? "gradient-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiData[role].map((kpi, i) => (
            <AnimatedSection key={kpi.title} delay={i * 0.1}>
              <div className="card-glass p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                    <kpi.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${kpi.positive ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{kpi.title}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          <AnimatedSection delay={0.1}>
            <div className="card-glass p-5">
              <h3 className="font-semibold mb-4">AI Model Usage</h3>
              <div className="h-64"><Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#9ca3af", padding: 16 } } } }} /></div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="card-glass p-5">
              <h3 className="font-semibold mb-4">Weekly Queries</h3>
              <div className="h-64"><Bar data={barData} options={chartOptions} /></div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="card-glass p-5">
              <h3 className="font-semibold mb-4">Revenue Growth ($K)</h3>
              <div className="h-64"><Line data={lineData} options={chartOptions} /></div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
