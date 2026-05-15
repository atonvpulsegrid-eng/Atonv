import { NextResponse } from "next/server";

export async function GET() {
  const metrics = {
    totalUsers: Math.floor(12000 + Math.random() * 1000),
    activeLeads: Math.floor(300 + Math.random() * 50),
    aiQueries: Math.floor(5000 + Math.random() * 500),
    revenue: Math.floor(120000 + Math.random() * 10000),
    conversionRate: (22 + Math.random() * 5).toFixed(1),
    avgResponseTime: (0.5 + Math.random() * 0.5).toFixed(2),
    modelUsage: {
      openai: Math.floor(30 + Math.random() * 10),
      gemini: Math.floor(25 + Math.random() * 10),
      groq: Math.floor(20 + Math.random() * 10),
      perplexity: Math.floor(10 + Math.random() * 10),
    },
    weeklyQueries: Array.from({ length: 7 }, () => Math.floor(100 + Math.random() * 200)),
    monthlyRevenue: Array.from({ length: 6 }, (_, i) => Math.floor(30000 + i * 15000 + Math.random() * 5000)),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(metrics);
}
