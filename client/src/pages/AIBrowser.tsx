import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Zap, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const exampleQueries = [
  "What is quantum computing?",
  "Explain machine learning",
  "How does blockchain work?",
  "What is AI ethics?",
  "Explain neural networks",
];

const providers = [
  { name: "OpenAI", color: "from-green-500 to-emerald-600" },
  { name: "Gemini", color: "from-blue-500 to-cyan-600" },
  { name: "Groq", color: "from-purple-500 to-pink-600" },
  { name: "Perplexity", color: "from-orange-500 to-red-600" },
];

export default function AIBrowserPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Record<string, any>>({});

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsLoading(true);

    setTimeout(() => {
      const mockResults: Record<string, any> = {};
      providers.forEach((provider) => {
        mockResults[provider.name] = {
          response: `Response from ${provider.name} about "${query}". This is a simulated response showing how different AI providers would answer your query.`,
          time: Math.floor(Math.random() * 500) + 100,
          cost: (Math.random() * 0.05).toFixed(4),
          quality: (Math.random() * 2 + 3).toFixed(1),
        };
      });
      setResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">AI Browser</h1>
          <p className="text-gray-400">Compare responses from multiple AI providers in real-time</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="Ask anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          {/* Example Queries */}
          <div>
            <p className="text-sm text-gray-400 mb-3">Try these queries:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((example, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setQuery(example)}
                  className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/20 hover:border-blue-500/50 hover:bg-white/20 transition-all"
                >
                  {example}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Querying AI providers...</p>
            </div>
          </motion.div>
        ) : Object.keys(results).length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {providers.map((provider, idx) => (
                <motion.div
                  key={provider.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${provider.color}`} />
                    <h3 className="text-lg font-semibold">{provider.name}</h3>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {results[provider.name]?.response}
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">
                        <Zap className="w-4 h-4" />
                        Speed
                      </div>
                      <p className="text-lg font-semibold">{results[provider.name]?.time}ms</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        Cost
                      </div>
                      <p className="text-lg font-semibold">${results[provider.name]?.cost}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">
                        <Star className="w-4 h-4" />
                        Quality
                      </div>
                      <p className="text-lg font-semibold">{results[provider.name]?.quality}/5</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">Enter a query to see responses from multiple AI providers</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
