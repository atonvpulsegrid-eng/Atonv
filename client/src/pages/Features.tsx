import { motion } from "framer-motion";
import { Brain, Zap, Plug, BarChart3, Shield, Workflow } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Hybrid LLM Router",
    description: "Intelligently route queries to the best AI model based on accuracy, latency, and cost metrics. Adaptive learning improves routing over time.",
  },
  {
    icon: Zap,
    title: "Spatial Intelligence",
    description: "Advanced spatial reasoning and context awareness capabilities for complex problem solving and data analysis.",
  },
  {
    icon: Plug,
    title: "Enterprise Connectors",
    description: "Seamless integration with your existing business tools and platforms. Support for 50+ connectors out of the box.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Comprehensive dashboards with real-time metrics, performance tracking, and actionable insights.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption, role-based access control, and audit logging.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Automate complex business processes with visual workflow builder and intelligent task orchestration.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">Powerful Features</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale AI-powered applications
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all group"
              >
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/20"
        >
          <h2 className="text-3xl font-bold mb-8">Why Choose ATONV?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Performance</h3>
              <ul className="space-y-2 text-gray-400">
                <li>✓ 99.9% uptime SLA</li>
                <li>✓ Sub-100ms latency</li>
                <li>✓ Auto-scaling infrastructure</li>
                <li>✓ Global CDN distribution</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Developer Experience</h3>
              <ul className="space-y-2 text-gray-400">
                <li>✓ Simple REST & GraphQL APIs</li>
                <li>✓ SDKs for all major languages</li>
                <li>✓ Comprehensive documentation</li>
                <li>✓ Active developer community</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
