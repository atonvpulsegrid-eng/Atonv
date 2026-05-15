"use client";
import AnimatedSection from "@/components/AnimatedSection";

const posts = [
  { title: "Introducing ATONV: The Universal AI Business Platform", excerpt: "We're excited to launch ATONV, a platform that brings together multiple AI models, lead management, and real-time analytics in one unified experience.", date: "May 15, 2026", category: "Announcement", readTime: "5 min" },
  { title: "How Hybrid LLM Routing Saves 40% on AI Costs", excerpt: "Learn how our intelligent routing system automatically selects the best AI model for each query, optimizing for cost, speed, and quality.", date: "May 12, 2026", category: "Technology", readTime: "8 min" },
  { title: "Building Enterprise-Grade Security for AI Platforms", excerpt: "A deep dive into our security architecture: JWT authentication, role-based access control, audit logging, and blockchain-verified reports.", date: "May 8, 2026", category: "Security", readTime: "10 min" },
  { title: "AI-Powered Lead Management: From Scoring to Closing", excerpt: "Discover how ATONV uses AI to score leads, automate nurture sequences, and provide real-time pipeline visibility for your sales team.", date: "May 5, 2026", category: "Product", readTime: "7 min" },
  { title: "Real-time Analytics for Investors: A Complete Guide", excerpt: "How to set up role-based dashboards that give investors, managers, and agents exactly the metrics they need.", date: "May 1, 2026", category: "Guide", readTime: "6 min" },
  { title: "Connecting 50+ AI Services with Universal Connectors", excerpt: "Our connector architecture makes it easy to integrate OpenAI, Gemini, Groq, Perplexity, ElevenLabs, and dozens more services.", date: "Apr 28, 2026", category: "Technology", readTime: "9 min" },
];

const categoryColors: Record<string, string> = {
  Announcement: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Technology: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Security: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  Product: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Guide: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
};

export default function BlogPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">ATONV <span className="gradient-text">Blog</span></h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Insights, updates, and guides from the ATONV team.</p>
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.title} delay={i * 0.1}>
              <div className="card-glass p-6 h-full flex flex-col cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>{post.category}</span>
                  <span className="text-xs text-gray-400">{post.readTime} read</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                <p className="text-xs text-gray-400">{post.date}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
