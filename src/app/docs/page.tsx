"use client";
import AnimatedSection from "@/components/AnimatedSection";
import { Book, Code, Zap, Shield, Plug, BarChart3 } from "lucide-react";

const sections = [
  { icon: Zap, title: "Getting Started", desc: "Quick start guide to set up ATONV and make your first AI query in under 5 minutes.", items: ["Installation", "Configuration", "First Query", "Dashboard Setup"] },
  { icon: Code, title: "API Reference", desc: "Complete API documentation for all endpoints with examples and authentication guides.", items: ["Authentication", "Leads API", "AI Browser API", "Metrics API"] },
  { icon: Plug, title: "Connectors", desc: "Learn how to integrate microphones, speakers, browser tabs, and 50+ AI services.", items: ["Hardware Setup", "AI Services", "Custom Connectors", "Webhooks"] },
  { icon: BarChart3, title: "Analytics", desc: "Set up dashboards, configure KPIs, and generate investor-ready reports.", items: ["Dashboard Config", "Custom KPIs", "Report Generation", "Export Options"] },
  { icon: Shield, title: "Security", desc: "Enterprise security features including JWT auth, RBAC, and audit logging.", items: ["Authentication", "Role Management", "Audit Logs", "Compliance"] },
  { icon: Book, title: "Guides", desc: "Step-by-step tutorials for common workflows and advanced features.", items: ["Lead Nurturing", "AI Model Selection", "Team Management", "Deployment"] },
];

export default function DocsPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4"><span className="gradient-text">Documentation</span></h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Everything you need to build, integrate, and scale with ATONV.</p>
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.1}>
              <div className="card-glass p-6 h-full">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{s.desc}</p>
                <ul className="space-y-1">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">→ {item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
