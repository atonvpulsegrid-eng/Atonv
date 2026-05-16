import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  engine?: string;
  score?: number;
  stats?: {
    successes: number;
    total: number;
    successRate: number;
  };
  timestamp: Date;
}

export default function AIRouterChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "Welcome to ATONV AI Router! Ask me anything, and I'll route your query to the best-performing LLM engine.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const routerQuery = trpc.router.query.useMutation();
  const recordFeedback = trpc.router.recordFeedback.useMutation();
  const getStats = trpc.router.getStats.useQuery();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendQuery = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the AI Router
      const result = await routerQuery.mutateAsync({ query: inputValue });

      // Add assistant message with engine info
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: "assistant",
        content: result.reply,
        engine: result.engine,
        score: result.score,
        stats: result.stats,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Simulate feedback (in production, user would rate the response)
      setTimeout(() => {
        recordFeedback.mutate({
          engine: result.engine,
          success: true, // Assume success for demo
        });
      }, 1000);
    } catch (error) {
      console.error("Error querying router:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: "assistant",
        content: "Sorry, I encountered an error processing your query. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendQuery();
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white rounded-2xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
        <h2 className="text-2xl font-bold mb-2">AI Router Chat</h2>
        <p className="text-sm text-gray-400">Adaptive engine selection based on performance metrics</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message, idx) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-white/10 border border-white/20 text-gray-100"
                }`}
              >
                {message.type === "assistant" && message.engine && (
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400">{message.engine}</span>
                    <span className="text-gray-500">(optimized)</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.type === "assistant" && message.stats && (
                  <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-400 space-y-1">
                    <div>Success Rate: {(message.stats.successRate * 100).toFixed(1)}%</div>
                    <div>Queries: {message.stats.total}</div>
                    {message.score !== undefined && (
                      <div>Score: {(message.score * 100).toFixed(1)}/100</div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span className="text-sm text-gray-400">Routing query to optimal engine...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Stats Panel */}
      {getStats.data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 py-4 border-t border-white/10 bg-white/5"
        >
          <p className="text-xs font-semibold text-gray-400 mb-3">Engine Performance</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(getStats.data).map(([key, engine]: [string, any]) => (
              <div key={key} className="text-xs bg-white/5 p-2 rounded border border-white/10">
                <div className="font-medium text-white">{engine.name}</div>
                <div className="text-gray-400">Score: {(engine.score * 100).toFixed(0)}/100</div>
                <div className="text-gray-500">Success: {(engine.successRate * 100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="p-6 border-t border-white/10 bg-gradient-to-r from-blue-500/5 to-purple-600/5">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-blue-500/50"
          />
          <Button
            onClick={handleSendQuery}
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          The router automatically selects the best engine based on accuracy, latency, and cost metrics.
        </p>
      </div>
    </div>
  );
}
