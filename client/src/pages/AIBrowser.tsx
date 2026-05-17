import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Zap, TrendingUp, Star, Download, FileText, Image as ImageIcon, Video, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const exampleQueries = [
  "Market analysis for Q4 2026",
  "Summarize latest AI trends",
  "Generate a cold outreach email",
  "Compare cloud providers for startups",
  "Write a product launch strategy",
];

const providers = [
  { name: "OpenAI", color: "from-green-500 to-emerald-600" },
  { name: "Gemini", color: "from-blue-500 to-cyan-600" },
  { name: "Groq", color: "from-purple-500 to-pink-600" },
  { name: "Perplexity", color: "from-orange-500 to-red-600" },
];

type ContentType = "text" | "image" | "video" | "pdf" | "file";

interface ResponseData {
  contentType: ContentType;
  content: string;
  title?: string;
  description?: string;
  time: number;
  cost: string;
  quality: string;
}

const mockResponses: Record<string, Record<string, ResponseData>> = {
  "market analysis for q4 2026": {
    OpenAI: {
      contentType: "text",
      content: "Based on comprehensive analysis, the market analysis for Q4 2026 shows strong growth indicators with a projected 23% increase in AI adoption across enterprises. Key sectors include cloud computing, automation, and intelligent analytics.",
      title: "Q4 2026 Market Analysis",
      time: 245,
      cost: "0.03",
      quality: "4.8",
    },
    Gemini: {
      contentType: "image",
      content: "📊 Market Analysis Chart - Shows upward trend in AI adoption, cloud services growth, and enterprise spending patterns for Q4 2026",
      title: "Market Trends Visualization",
      time: 180,
      cost: "0.02",
      quality: "4.6",
    },
    Groq: {
      contentType: "pdf",
      content: "Q4_2026_Market_Report.pdf - Comprehensive 45-page market analysis including competitive landscape, growth projections, and strategic recommendations",
      title: "Detailed Market Report",
      time: 320,
      cost: "0.05",
      quality: "4.9",
    },
    Perplexity: {
      contentType: "text",
      content: "The current market landscape reveals significant opportunities in AI-driven automation, with enterprises allocating 18-25% year-over-year growth budgets. Key metrics point to increased enterprise adoption and expanding use cases across sectors.",
      title: "Market Insights",
      time: 150,
      cost: "0.025",
      quality: "4.7",
    },
  },
  "summarize latest ai trends": {
    OpenAI: {
      contentType: "text",
      content: "Latest AI trends include multimodal models, improved reasoning capabilities, and enterprise-grade AI applications. Notable developments: GPT-5 advancements, open-source model proliferation, and increased focus on AI safety and ethics.",
      title: "AI Trends Summary",
      time: 200,
      cost: "0.02",
      quality: "4.7",
    },
    Gemini: {
      contentType: "video",
      content: "🎥 AI Trends Overview - 5-minute video covering latest developments in generative AI, multimodal models, and enterprise applications",
      title: "AI Trends Video",
      time: 450,
      cost: "0.08",
      quality: "4.8",
    },
    Groq: {
      contentType: "file",
      content: "ai_trends_2026.txt - Text file containing detailed breakdown of current AI trends, market movements, and future predictions",
      title: "AI Trends Document",
      time: 120,
      cost: "0.01",
      quality: "4.5",
    },
    Perplexity: {
      contentType: "text",
      content: "2026 AI landscape is dominated by efficiency improvements, multimodal capabilities, and real-world applications. Major trends: smaller models outperforming larger ones, improved reasoning, better context handling, and enterprise AI adoption acceleration.",
      title: "Comprehensive AI Analysis",
      time: 180,
      cost: "0.022",
      quality: "4.6",
    },
  },
  default: {
    OpenAI: {
      contentType: "text",
      content: "Yes, good morning! Thank you for reaching out. I'm here to help you with any questions or tasks you may have. How can I assist you today? Whether you need information, analysis, coding help, or creative writing, I'm ready to help.",
      time: 150,
      cost: "0.015",
      quality: "4.5",
    },
    Gemini: {
      contentType: "text",
      content: "Good morning! I'm delighted to help you. I can assist with a wide range of tasks including answering questions, providing explanations, helping with writing, coding, analysis, and much more. What would you like to know or work on?",
      time: 180,
      cost: "0.018",
      quality: "4.6",
    },
    Groq: {
      contentType: "text",
      content: "Good morning! Yes, I'm here to help you. I can process your requests quickly and efficiently. Feel free to ask me anything - whether it's technical questions, creative tasks, analysis, or general information. How can I be of service?",
      time: 120,
      cost: "0.012",
      quality: "4.4",
    },
    Perplexity: {
      contentType: "text",
      content: "Good morning! I'm ready to assist you. I can help you find information, analyze topics, answer complex questions, and provide detailed explanations. What specific topic or question would you like me to help you with today?",
      time: 200,
      cost: "0.020",
      quality: "4.7",
    },
  },
};

// Content Type Renderer Component
function ContentRenderer({ data }: { data: ResponseData }) {
  const getContentIcon = (type: ContentType) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "pdf":
        return <FileJson className="w-4 h-4" />;
      case "file":
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getContentLabel = (type: ContentType) => {
    switch (type) {
      case "image":
        return "Image";
      case "video":
        return "Video";
      case "pdf":
        return "PDF Document";
      case "file":
        return "Text File";
      default:
        return "Text";
    }
  };

  return (
    <div className="mb-8">
      {/* Content Type Badge */}
      {data.contentType !== "text" && (
        <div className="mb-3 flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 text-xs font-semibold flex items-center gap-2">
            {getContentIcon(data.contentType)}
            {getContentLabel(data.contentType)}
          </div>
        </div>
      )}

      {/* Content Box */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-2 border-white/20 min-h-24">
        {data.contentType === "text" && (
          <p className="text-white leading-relaxed text-base font-medium break-words whitespace-pre-wrap">
            {data.content}
          </p>
        )}

        {data.contentType === "image" && (
          <div className="flex flex-col items-center justify-center py-8">
            <ImageIcon className="w-16 h-16 text-blue-400 mb-4 opacity-50" />
            <p className="text-white text-center font-medium">{data.content}</p>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <Download className="w-4 h-4" />
              View Image
            </Button>
          </div>
        )}

        {data.contentType === "video" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Video className="w-16 h-16 text-purple-400 mb-4 opacity-50" />
            <p className="text-white text-center font-medium">{data.content}</p>
            <Button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2">
              <Download className="w-4 h-4" />
              Play Video
            </Button>
          </div>
        )}

        {data.contentType === "pdf" && (
          <div className="flex flex-col items-center justify-center py-8">
            <FileJson className="w-16 h-16 text-red-400 mb-4 opacity-50" />
            <p className="text-white text-center font-medium">{data.content}</p>
            <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        )}

        {data.contentType === "file" && (
          <div className="flex flex-col items-center justify-center py-8">
            <FileText className="w-16 h-16 text-green-400 mb-4 opacity-50" />
            <p className="text-white text-center font-medium">{data.content}</p>
            <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download File
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AIBrowserPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Record<string, ResponseData>>({});

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsLoading(true);

    setTimeout(() => {
      const queryKey = query.toLowerCase();
      let selectedResponses = mockResponses[queryKey] || mockResponses.default;

      // Add slight variation to metrics
      const mockResults: Record<string, ResponseData> = {};
      providers.forEach((provider) => {
        const baseResponse = selectedResponses[provider.name];
        mockResults[provider.name] = {
          ...baseResponse,
          time: baseResponse.time + Math.floor(Math.random() * 50) - 25,
          cost: (parseFloat(baseResponse.cost) + (Math.random() * 0.01 - 0.005)).toFixed(4),
          quality: (parseFloat(baseResponse.quality) + (Math.random() * 0.2 - 0.1)).toFixed(1),
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
          <h1 className="text-3xl font-bold mb-2">Multi-LLM AI Browser</h1>
          <p className="text-gray-400">Query multiple AI models simultaneously and compare results side-by-side for the best answers.</p>
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
              placeholder="Try: Market analysis for Q4 2026"
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
                    className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/30 hover:border-white/60 transition-all shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${provider.color}`} />
                      <h3 className="text-xl font-bold text-white">{provider.name}</h3>
                      <div className="flex gap-1 ml-auto">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(parseFloat(result?.quality || "0"))
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Content Renderer */}
                    <ContentRenderer data={result} />

                    {/* Metrics */}
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
