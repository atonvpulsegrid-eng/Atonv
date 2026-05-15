"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { Brain, Globe, Plug, BarChart3, Users, Shield, Cpu, Workflow, Bot, Layers } from "lucide-react";

const allFeatures = [
  { icon: Brain, title: "Hybrid LLM Router", desc: "Automatically selects the best AI model for each query based on cost, speed, and quality requirements. Supports OpenAI, Gemini, Groq, and Perplexity.", color: "from-purple-500 to-indigo-500" },
  { icon: Globe, title: "Spatial Intelligence", desc: "Location-aware AI processing that understands geographic context, enabling smarter business decisions based on spatial data.", color: "from-blue-500 to-cyan-500" },
  { icon: Plug, title: "Universal Connectors", desc: "One-click integration with microphones, speakers, browser tabs, and 50+ AI services. Real-time status monitoring included.", color: "from-pink-500 to-rose-500" },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Live dashboards with KPI cards, interactive charts, and role-based views for agents, managers, and investors.", color: "from-green-500 to-emerald-500" },
  { icon: Users, title: "Lead Management", desc: "Complete CRM with AI-powered scoring, automated nurture sequences, pipeline tracking, and colored status tags.", color: "from-orange-500 to-amber-500" },
  { icon: Shield, title: "Enterprise Security", desc: "JWT authentication, role-based access control, comprehensive audit logging, and tamper-proof investor reports.", color: "from-red-500 to-pink-500" },
  { icon: Bot, title: "AI Query Browser", desc: "Query multiple AI models simultaneously, compare results side-by-side, and track response metrics in real-time.", color: "from-violet-500 to-purple-500" },
  { icon: Workflow, title: "Workflow Orchestration", desc: "Automated pipeline: Scraper → Verifier → Nurturer → Closer. Full logging and error handling at every stage.", color: "from-teal-500 to-green-500" },
  { icon: Layers, title: "Multi-tenant Architecture", desc: "Isolated environments for each organization with shared infrastructure. Scale from startup to enterprise seamlessly.", color: "from-amber-500 to-orange-500" },
  { icon: Cpu, title: "Edge Computing", desc: "Process AI queries at the edge for minimal latency. Automatic failover and load balancing across regions.", color: "from-cyan-500 to-blue-500" },
];

export default function FeaturesPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Platform <span className="gradient-text">Features</span></h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Everything you need to build, manage, and scale AI-powered business operations.</p>
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-6">
          {allFeatures.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.05}>
              <div className="card-glass p-6 flex gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
