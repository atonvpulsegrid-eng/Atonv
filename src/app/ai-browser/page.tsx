"use client";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { Send, Clock, DollarSign, Star, Loader2 } from "lucide-react";

interface AIResult { provider: string; response: string; time: string; cost: string; quality: number; }

const exampleQueries = ["Market analysis for Q4 2026", "Summarize latest AI trends", "Generate a cold outreach email", "Compare cloud providers for startups", "Write a product launch strategy"];

const mockResults: Record<string, AIResult[]> = {
  default: [
    { provider: "OpenAI GPT-4", response: "Based on comprehensive analysis, the market shows strong growth indicators with a projected 23% increase in AI adoption across enterprise sectors...", time: "1.2s", cost: "$0.03", quality: 95 },
    { provider: "Google Gemini", response: "The current market landscape reveals significant opportunities in AI-driven automation, with key sectors showing 18-25% year-over-year growth...", time: "0.8s", cost: "$0.02", quality: 92 },
    { provider: "Groq Llama", response: "Market indicators suggest robust growth in the AI sector. Key metrics point to increased enterprise adoption and expanding use cases across industries...", time: "0.3s", cost: "$0.005", quality: 88 },
    { provider: "Perplexity", response: "According to recent reports and real-time data, the AI market is experiencing unprecedented growth with total addressable market reaching $500B by 2027...", time: "1.5s", cost: "$0.025", quality: 90 },
  ],
};

export default function AIBrowserPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AIResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (q?: string) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setLoading(true);
    setHasSearched(true);
    setTimeout(() => {
      setResults(mockResults.default);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Multi-LLM <span className="gradient-text">AI Browser</span></h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Query multiple AI models simultaneously and compare results side-by-side for the best answers.</p>
          </div>
        </AnimatedSection>

        {/* Search Input */}
        <AnimatedSection delay={0.1}>
          <div className="card-glass p-6 mb-8">
            <div className="flex gap-2 mb-4">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} placeholder="Ask anything across multiple AI models..." className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              <button onClick={() => handleSearch()} disabled={loading} className="btn-primary !px-5 inline-flex items-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((q) => (
                <button key={q} onClick={() => handleSearch(q)} className="px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Results */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Querying 4 AI models simultaneously...</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-4">
              {results.map((r) => (
                <div key={r.provider} className="card-glass p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{r.provider}</h3>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.round(r.quality / 20) ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{r.response}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.time}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{r.cost}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" />{r.quality}%</span>
                  </div>
                  <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${r.quality}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {!loading && !hasSearched && (
          <AnimatedSection delay={0.2}>
            <div className="text-center py-12 card-glass">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">Ready to explore AI</h3>
              <p className="text-gray-500 dark:text-gray-400">Type a query or click an example chip to compare responses from 4 AI providers.</p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
