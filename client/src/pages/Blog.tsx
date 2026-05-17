import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "Introducing the Hybrid LLM Router",
    excerpt: "Learn how our adaptive routing system selects the best AI model for each query, optimizing for accuracy, latency, and cost.",
    author: "Sarah Chen",
    date: "May 15, 2024",
    category: "Product",
    image: "🤖",
  },
  {
    title: "Enterprise Security Best Practices",
    excerpt: "A comprehensive guide to securing your AI applications with encryption, access control, and audit logging.",
    author: "Michael Rodriguez",
    date: "May 12, 2024",
    category: "Security",
    image: "🔒",
  },
  {
    title: "Scaling AI Workloads: A Case Study",
    excerpt: "How one Fortune 500 company scaled their AI infrastructure from 1k to 1M queries per day using ATONV.",
    author: "Emma Thompson",
    date: "May 8, 2024",
    category: "Case Study",
    image: "📈",
  },
  {
    title: "The Future of Adaptive AI",
    excerpt: "Exploring emerging trends in machine learning and how adaptive systems are changing the landscape.",
    author: "Dr. James Wilson",
    date: "May 1, 2024",
    category: "Research",
    image: "🔮",
  },
  {
    title: "API Integration Guide",
    excerpt: "Step-by-step tutorial for integrating ATONV into your existing applications with code examples.",
    author: "Alex Kumar",
    date: "April 28, 2024",
    category: "Tutorial",
    image: "💻",
  },
  {
    title: "Cost Optimization Strategies",
    excerpt: "Practical tips for reducing your AI infrastructure costs while maintaining performance and quality.",
    author: "Lisa Anderson",
    date: "April 25, 2024",
    category: "Tips",
    image: "💰",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Latest insights, tutorials, and updates from the ATONV team
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 p-8 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-white/20 hover:border-white/40 transition-all"
        >
          <div className="flex items-start gap-6">
            <div className="text-6xl">{blogPosts[0].image}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-300">
                  {blogPosts[0].category}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-3">{blogPosts[0].title}</h2>
              <p className="text-gray-300 mb-4">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {blogPosts[0].author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {blogPosts[0].date}
                </div>
              </div>
              <Button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Read Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all group cursor-pointer"
            >
              <div className="text-5xl mb-4">{post.image}</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-300">
                  {post.category}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-white/10">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/20 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Get the latest insights, tutorials, and updates delivered to your inbox every week.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
