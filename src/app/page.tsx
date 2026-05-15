"use client";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { Zap, Brain, Plug, BarChart3, Users, Globe, Shield, Cpu, Sparkles, ArrowRight, Check } from "lucide-react";

const features = [
  { icon: Brain, title: "Hybrid LLM Router", desc: "Intelligently routes queries across OpenAI, Gemini, Groq, and Perplexity for optimal cost, speed, and quality.", color: "from-purple-500 to-indigo-500" },
  { icon: Globe, title: "Spatial Intelligence", desc: "Location-aware AI that understands context, geography, and spatial relationships for smarter decisions.", color: "from-blue-500 to-cyan-500" },
  { icon: Plug, title: "Universal Connectors", desc: "Seamlessly connect microphone, speaker, browser tabs, and 50+ AI services with one-click integration.", color: "from-pink-500 to-rose-500" },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Live dashboards with KPI tracking, investor reports, and role-based views for your entire team.", color: "from-green-500 to-emerald-500" },
  { icon: Users, title: "Lead Management", desc: "Full CRM pipeline with AI-powered lead scoring, nurturing workflows, and automated follow-ups.", color: "from-orange-500 to-amber-500" },
  { icon: Shield, title: "Enterprise Security", desc: "JWT authentication, role-based access, audit logging, and blockchain-verified investor reports.", color: "from-red-500 to-pink-500" },
];

const pricingPlans = [
  { name: "Starter", price: "$29", period: "/month", desc: "Perfect for small teams getting started with AI", features: ["5 Team Members", "1,000 AI Queries/mo", "Basic Lead Management", "Email Support", "3 Connectors"], cta: "Start Free Trial", popular: false },
  { name: "Pro", price: "$99", period: "/month", desc: "For growing businesses that need more power", features: ["25 Team Members", "10,000 AI Queries/mo", "Advanced Lead Management", "Priority Support", "All Connectors", "Analytics Dashboard", "Custom Reports"], cta: "Start Free Trial", popular: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "For organizations that need full control", features: ["Unlimited Members", "Unlimited AI Queries", "Full CRM Suite", "24/7 Dedicated Support", "All Connectors", "Advanced Analytics", "Custom Integrations", "SLA Guarantee"], cta: "Contact Sales", popular: false },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" /> Powered by Multi-LLM Intelligence
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
              The Universal <span className="gradient-text">AI Business</span><br />Platform
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Route queries across multiple LLMs, manage leads with AI intelligence, and connect every tool in your stack.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="btn-primary inline-flex items-center justify-center gap-2">Get Started Free <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/features" className="btn-secondary inline-flex items-center justify-center gap-2">Explore Features</Link>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              {["OpenAI", "Gemini", "Groq", "Perplexity", "ElevenLabs"].map((n) => (
                <div key={n} className="flex items-center gap-2"><Cpu className="w-4 h-4" />{n}</div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-28 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Core Intelligence <span className="gradient-text">Layers</span></h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Six powerful modules working together to transform your business with AI-driven intelligence.</p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="card-glass p-6 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Connectors Preview */}
      <section className="py-20 sm:py-28 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Universal <span className="gradient-text">Connectors</span></h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Connect your microphone, speakers, browser tabs, and AI services with real-time status monitoring.</p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Microphone", status: "active", icon: "🎙️" },
              { name: "Speaker", status: "active", icon: "🔊" },
              { name: "Browser Tab", status: "active", icon: "🌐" },
              { name: "OpenAI", status: "active", icon: "🤖" },
              { name: "Gemini", status: "pending", icon: "✨" },
              { name: "Groq", status: "active", icon: "⚡" },
              { name: "Perplexity", status: "disconnected", icon: "🔍" },
              { name: "ElevenLabs", status: "active", icon: "🗣️" },
            ].map((c, i) => (
              <AnimatedSection key={c.name} delay={i * 0.05}>
                <div className="card-glass p-4 flex items-center gap-3">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{c.status}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${c.status === "active" ? "bg-green-500" : c.status === "pending" ? "bg-yellow-500" : "bg-gray-400"}`} />
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/connectors" className="btn-secondary inline-flex items-center gap-2 text-sm">Manage Connectors <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Lead Management Preview */}
      <section className="py-20 sm:py-28 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">AI-Powered <span className="gradient-text">Lead Management</span></h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Track, nurture, and close leads with intelligent scoring, automated workflows, and real-time pipeline visibility.</p>
                <ul className="space-y-3 mb-8">
                  {["Smart lead scoring with AI", "Automated nurture sequences", "Real-time pipeline tracking", "Status filters with color tags"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm"><Check className="w-5 h-5 text-green-500 flex-shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
                <Link href="/leads" className="btn-primary inline-flex items-center gap-2">Manage Leads <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="card-glass p-6">
                <div className="space-y-3">
                  {[
                    { name: "Acme Corp", status: "Active", color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
                    { name: "TechStart Inc", status: "Pending", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" },
                    { name: "Global Solutions", status: "Active", color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
                    { name: "DataFlow Ltd", status: "Lost", color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
                  ].map((lead) => (
                    <div key={lead.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{lead.name[0]}</div>
                        <span className="text-sm font-medium">{lead.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${lead.color}`}>{lead.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* AI Browser Preview */}
      <section className="py-20 sm:py-28 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Multi-LLM <span className="gradient-text">AI Browser</span></h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Query multiple AI models simultaneously and compare results side-by-side.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="max-w-4xl mx-auto card-glass p-6">
              <div className="flex gap-2 mb-6">
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 text-sm text-gray-400">Ask anything across multiple AI models...</div>
                <button className="btn-primary !px-4 !py-2 text-sm">Send</button>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Market analysis for Q4", "Summarize latest tech trends", "Generate sales email"].map((q) => (
                  <span key={q} className="px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">{q}</span>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "OpenAI GPT-4", time: "1.2s", quality: "95%" },
                  { name: "Google Gemini", time: "0.8s", quality: "92%" },
                  { name: "Groq Llama", time: "0.3s", quality: "88%" },
                  { name: "Perplexity", time: "1.5s", quality: "90%" },
                ].map((m) => (
                  <div key={m.name} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">{m.name}</span>
                      <span className="text-xs text-green-600 dark:text-green-400">{m.quality}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Response time: {m.time}</p>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full gradient-primary rounded-full" style={{ width: m.quality }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <div className="text-center mt-8">
            <Link href="/ai-browser" className="btn-secondary inline-flex items-center gap-2 text-sm">Open AI Browser <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-28 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent <span className="gradient-text">Pricing</span></h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Choose the plan that fits your business. All plans include a 14-day free trial.</p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <div className={`card-glass p-6 h-full flex flex-col ${plan.popular ? "ring-2 ring-indigo-500 relative" : ""}`}>
                  {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-primary text-white text-xs font-semibold">Most Popular</div>}
                  <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-2"><span className="text-4xl font-bold">{plan.price}</span><span className="text-gray-500 dark:text-gray-400">{plan.period}</span></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{plan.desc}</p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {plan.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-500 flex-shrink-0" />{f}</li>))}
                  </ul>
                  <button className={plan.popular ? "btn-primary w-full" : "btn-secondary w-full"}>{plan.cta}</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 px-4 bg-gray-50 dark:bg-gray-900/50">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Join thousands of companies using ATONV to power their AI-driven operations.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="btn-primary inline-flex items-center justify-center gap-2">Start Free Trial <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/contact" className="btn-secondary inline-flex items-center justify-center gap-2">Contact Sales</Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
