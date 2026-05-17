import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Zap, TrendingUp, Star, Download, FileText, Image as ImageIcon, Video, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const providers = [
  { name: "OpenAI", color: "from-green-500 to-emerald-600" },
  { name: "Gemini", color: "from-blue-500 to-cyan-600" },
  { name: "Groq", color: "from-purple-500 to-pink-600" },
  { name: "Perplexity", color: "from-orange-500 to-red-600" },
];

type ContentType = "text" | "image" | "video" | "pdf" | "file";

interface ProviderResponse {
  contentType: ContentType;
  content: string;
  title?: string;
  time: number;
  cost: string;
  quality: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  query?: string;
  responses?: Record<string, ProviderResponse>;
  timestamp: Date;
}

const mockResponses: Record<string, Record<string, ProviderResponse>> = {
  "hi": {
    OpenAI: {
      contentType: "text",
      content: "Hello! I'm OpenAI's GPT model. I'm here to help you with any questions, creative writing, coding, analysis, or general information. What can I assist you with today?",
      time: 150,
      cost: "0.015",
      quality: "4.8",
    },
    Gemini: {
      contentType: "text",
      content: "Hi there! I'm Google's Gemini. I can help you with a wide range of tasks including answering questions, providing explanations, writing, coding, and much more. How can I assist you?",
      time: 180,
      cost: "0.018",
      quality: "4.7",
    },
    Groq: {
      contentType: "text",
      content: "Hello! I'm Groq, built for speed and efficiency. I can process your requests quickly and help with technical questions, analysis, writing, and general inquiries. What would you like to know?",
      time: 120,
      cost: "0.012",
      quality: "4.6",
    },
    Perplexity: {
      contentType: "text",
      content: "Greetings! I'm Perplexity, your AI research assistant. I can help you find information, analyze topics, answer complex questions, and provide detailed explanations. What's on your mind?",
      time: 200,
      cost: "0.020",
      quality: "4.9",
    },
  },
  "market analysis for q4 2026": {
    OpenAI: {
      contentType: "text",
      content: "Based on comprehensive analysis, Q4 2026 shows strong growth indicators with a projected 23% increase in AI adoption across enterprises. Key sectors include cloud computing, automation, and intelligent analytics.",
      time: 245,
      cost: "0.03",
      quality: "4.8",
    },
    Gemini: {
      contentType: "image",
      content: "📊 Market Analysis Chart - Shows upward trend in AI adoption, cloud services growth, and enterprise spending patterns for Q4 2026",
      time: 180,
      cost: "0.02",
      quality: "4.6",
    },
    Groq: {
      contentType: "pdf",
      content: "Q4_2026_Market_Report.pdf - Comprehensive 45-page market analysis including competitive landscape, growth projections, and strategic recommendations",
      time: 320,
      cost: "0.05",
      quality: "4.9",
    },
    Perplexity: {
      contentType: "text",
      content: "The current market landscape reveals significant opportunities in AI-driven automation, with enterprises allocating 18-25% year-over-year growth budgets. Key metrics point to increased enterprise adoption.",
      time: 150,
      cost: "0.025",
      quality: "4.7",
    },
  },
  "summarize latest ai trends": {
    OpenAI: {
      contentType: "text",
      content: "Latest AI trends include multimodal models, improved reasoning capabilities, and enterprise-grade AI applications. Notable developments: GPT-5 advancements, open-source model proliferation, and increased focus on AI safety.",
      time: 200,
      cost: "0.02",
      quality: "4.7",
    },
    Gemini: {
      contentType: "video",
      content: "🎥 AI Trends Overview - 5-minute video covering latest developments in generative AI, multimodal models, and enterprise applications",
      time: 450,
      cost: "0.08",
      quality: "4.8",
    },
    Groq: {
      contentType: "file",
      content: "ai_trends_2026.txt - Text file containing detailed breakdown of current AI trends, market movements, and future predictions",
      time: 120,
      cost: "0.01",
      quality: "4.5",
    },
    Perplexity: {
      contentType: "text",
      content: "2026 AI landscape is dominated by efficiency improvements, multimodal capabilities, and real-world applications. Major trends: smaller models outperforming larger ones, improved reasoning, and enterprise AI acceleration.",
      time: 180,
      cost: "0.022",
      quality: "4.6",
    },
  },
};

// Content Type Badge Component
function ContentTypeBadge({ type }: { type: ContentType }) {
  const getIcon = (t: ContentType) => {
    switch (t) {
      case "image":
        return <ImageIcon className="w-3 h-3" />;
      case "video":
        return <Video className="w-3 h-3" />;
      case "pdf":
        return <FileJson className="w-3 h-3" />;
      case "file":
        return <FileText className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getLabel = (t: ContentType) => {
    switch (t) {
      case "image":
        return "Image";
      case "video":
        return "Video";
      case "pdf":
        return "PDF";
      case "file":
        return "File";
      default:
        return "Text";
    }
  };

  const getBgColor = (t: ContentType) => {
    switch (t) {
      case "image":
        return "bg-blue-500/30 text-blue-300";
      case "video":
        return "bg-purple-500/30 text-purple-300";
      case "pdf":
        return "bg-red-500/30 text-red-300";
      case "file":
        return "bg-green-500/30 text-green-300";
      default:
        return "";
    }
  };

  if (type === "text") return null;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${getBgColor(type)}`}>
      {getIcon(type)}
      {getLabel(type)}
    </span>
  );
}

// Provider Response Bubble Component
function ProviderResponseBubble({ provider, response }: { provider: typeof providers[0]; response: ProviderResponse }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all"
    >
      {/* Provider Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${provider.color}`} />
          <span className="font-semibold text-sm text-white">{provider.name}</span>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(parseFloat(response.quality))
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Type Badge */}
      {response.contentType !== "text" && (
        <div className="mb-2">
          <ContentTypeBadge type={response.contentType} />
        </div>
      )}

      {/* Response Content */}
      <div className="mb-3">
        {response.contentType === "text" && (
          <p className="text-gray-100 text-sm leading-relaxed">{response.content}</p>
        )}

        {response.contentType === "image" && (
          <div className="flex flex-col items-center justify-center py-4 bg-white/5 rounded-lg border border-white/10">
            <ImageIcon className="w-8 h-8 text-blue-400 mb-2 opacity-50" />
            <p className="text-gray-300 text-xs text-center">{response.content}</p>
            <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs h-7 px-3 flex items-center gap-1">
              <Download className="w-3 h-3" />
              View
            </Button>
          </div>
        )}

        {response.contentType === "video" && (
          <div className="flex flex-col items-center justify-center py-4 bg-white/5 rounded-lg border border-white/10">
            <Video className="w-8 h-8 text-purple-400 mb-2 opacity-50" />
            <p className="text-gray-300 text-xs text-center">{response.content}</p>
            <Button className="mt-2 bg-purple-500 hover:bg-purple-600 text-white text-xs h-7 px-3 flex items-center gap-1">
              <Download className="w-3 h-3" />
              Play
            </Button>
          </div>
        )}

        {response.contentType === "pdf" && (
          <div className="flex flex-col items-center justify-center py-4 bg-white/5 rounded-lg border border-white/10">
            <FileJson className="w-8 h-8 text-red-400 mb-2 opacity-50" />
            <p className="text-gray-300 text-xs text-center">{response.content}</p>
            <Button className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs h-7 px-3 flex items-center gap-1">
              <Download className="w-3 h-3" />
              Download
            </Button>
          </div>
        )}

        {response.contentType === "file" && (
          <div className="flex flex-col items-center justify-center py-4 bg-white/5 rounded-lg border border-white/10">
            <FileText className="w-8 h-8 text-green-400 mb-2 opacity-50" />
            <p className="text-gray-300 text-xs text-center">{response.content}</p>
            <Button className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs h-7 px-3 flex items-center gap-1">
              <Download className="w-3 h-3" />
              Download
            </Button>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-xs">
        <div className="text-center">
          <div className="flex items-center justify-center gap-0.5 text-gray-400 mb-1">
            <Zap className="w-3 h-3 text-yellow-400" />
            Speed
          </div>
          <p className="font-semibold text-white">{response.time}ms</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-0.5 text-gray-400 mb-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            Cost
          </div>
          <p className="font-semibold text-white">${response.cost}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-0.5 text-gray-400 mb-1">
            <Star className="w-3 h-3 text-blue-400" />
            Quality
          </div>
          <p className="font-semibold text-white">{response.quality}/5</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AIBrowserPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = () => {
    if (!query.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      query: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const queryKey = query.toLowerCase();
      const selectedResponses = mockResponses[queryKey] || mockResponses["hi"];

      // Add AI responses
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        responses: selectedResponses,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      setQuery("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Multi-LLM AI Browser</h1>
          <p className="text-gray-400">Query multiple AI models simultaneously and compare results side-by-side for the best answers.</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🤖</div>
            <h2 className="text-3xl font-bold mb-4">Welcome to Multi-LLM AI Browser</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Ask any question and get responses from OpenAI, Gemini, Groq, and Perplexity side-by-side. Compare quality, speed, and cost instantly.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Hi", "Market analysis for Q4 2026", "Summarize latest AI trends"].map((example, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setQuery(example)}
                  className="px-4 py-2 rounded-full text-sm bg-white/10 border border-white/20 hover:border-blue-500/50 hover:bg-white/20 transition-all"
                >
                  {example}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message, idx) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {message.type === "user" ? (
                  // User Message
                  <div className="flex justify-end mb-6">
                    <div className="max-w-xs bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl px-6 py-3">
                      <p className="text-white font-medium">{message.query}</p>
                    </div>
                  </div>
                ) : (
                  // AI Responses
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-300">Responses from AI Providers:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {providers.map((provider) => {
                        const response = message.responses?.[provider.name];
                        if (!response) return null;
                        return (
                          <ProviderResponseBubble
                            key={provider.name}
                            provider={provider}
                            response={response}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center py-8"
              >
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-blue-500 animate-spin mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Querying AI providers...</p>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Input
              type="text"
              placeholder="Type your question here..."
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
        </div>
      </div>
    </div>
  );
}
