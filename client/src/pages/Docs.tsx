import { motion } from "framer-motion";
import { BookOpen, Code2, Zap, Shield } from "lucide-react";

const docSections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn the basics and set up your first integration in minutes",
    items: ["Installation", "Authentication", "Your First Request", "Best Practices"],
  },
  {
    icon: Code2,
    title: "API Reference",
    description: "Complete API documentation with examples for all endpoints",
    items: ["Queries Endpoint", "Leads Endpoint", "Metrics Endpoint", "Error Handling"],
  },
  {
    icon: Zap,
    title: "Integration Guides",
    description: "Step-by-step guides for integrating with popular platforms",
    items: ["Zapier", "Make.com", "Custom Webhooks", "Slack Integration"],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Security best practices and compliance information",
    items: ["API Keys", "OAuth 2.0", "Data Encryption", "Compliance"],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">Documentation</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Complete guides and API reference for the ATONV platform
          </p>
        </motion.div>

        {/* Doc Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {docSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all cursor-pointer group"
              >
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-gray-400 mb-6">{section.description}</p>
                <ul className="space-y-2">
                  {section.items.map((item, iidx) => (
                    <li key={iidx} className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Start Example</h2>
          <div className="bg-black/50 p-6 rounded-lg overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{`// Initialize the ATONV client
const atonv = new AtonvClient({
  apiKey: 'your-api-key'
});

// Query the AI Router
const response = await atonv.query({
  text: 'What are the latest trends?',
  maxTokens: 500
});

console.log(response.engine);    // Selected engine
console.log(response.reply);     // AI response
console.log(response.metrics);   // Performance metrics`}</code>
            </pre>
          </div>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="p-12 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/20 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-400 mb-6">
            Can't find what you're looking for? Check out our community forum or contact support.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors">
              Community Forum
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 hover:border-white/40 rounded-lg font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
