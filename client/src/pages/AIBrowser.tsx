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
      const responses: Record<string, string> = {
        OpenAI: `Yes, good morning! Thank you for reaching out. I'm here to help you with any questions or tasks you may have. How can I assist you today? Whether you need information, analysis, coding help, or creative writing, I'm ready to help.`,
        Gemini: `Good morning! I'm delighted to help you. I can assist with a wide range of tasks including answering questions, providing explanations, helping with writing, coding, analysis, and much more. What would you like to know or work on?`,
        Groq: `Good morning! Yes, I'm here to help you. I can process your requests quickly and efficiently. Feel free to ask me anything - whether it's technical questions, creative tasks, analysis, or general information. How can I be of service?`,
        Perplexity: `Good morning! I'm ready to assist you. I can help you find information, analyze topics, answer complex questions, and provide detailed explanations. What specific topic or question would you like me to help you with today?`,
      };
      
      providers.forEach((provider) => {
        mockResults[provider.name] = {
          response: responses[provider.name] || `Hello! I'm ${provider.name}, ready to help with your query: "${query}". How can I assist you further?`,
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
              placeholder="Try: Hi, good morning"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-6 font-semibold"
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
              <p className="text-gray-300 font-medium">Querying AI providers...</p>
            </div>
          </motion.div>
        ) : Object.keys(results).length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">Results from AI Providers</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {providers.map((provider, idx) => {
                const result = results[provider.name];
                return (
                  <motion.div
                    key={provider.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border-2 border-white/30 hover:border-white/60 transition-all shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${provider.color}`} />
                      <h3 className="text-xl font-bold text-white">{provider.name}</h3>
                    </div>

                    <div className="mb-8 p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-2 border-white/20 min-h-24">
                      <p className="text-white leading-relaxed text-base font-medium break-words whitespace-pre-wrap">
                        {result?.response || "Loading response..."}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-300 mb-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          Speed
                        </div>
                        <p className="text-lg font-bold text-white">{result?.time}ms</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-300 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          Cost
                        </div>
                        <p className="text-lg font-bold text-white">${result?.cost}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-300 mb-2">
                          <Star className="w-4 h-4 text-blue-400" />
                          Quality
                        </div>
                        <p className="text-lg font-bold text-white">{result?.quality}/5</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="text-6xl mb-6">🔍</div>
            <p className="text-gray-300 text-xl font-medium">Enter a query to see responses from multiple AI providers</p>
            <p className="text-gray-500 text-sm mt-3">Try one of the example queries above to get started</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
