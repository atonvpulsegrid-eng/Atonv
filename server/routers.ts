import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

// Engine profiles with base metrics
interface EngineProfile {
  name: string;
  costPer1kTokens: number;
  baseLatency: number;
  baseAccuracy: number;
  successes: number;
  total: number;
}

// In-memory engine stats (in production, use database)
const engineStats: Record<string, EngineProfile> = {
  openai: {
    name: "OpenAI",
    costPer1kTokens: 0.03,
    baseLatency: 250,
    baseAccuracy: 0.95,
    successes: 0,
    total: 0,
  },
  gemini: {
    name: "Gemini",
    costPer1kTokens: 0.0005,
    baseLatency: 300,
    baseAccuracy: 0.92,
    successes: 0,
    total: 0,
  },
  groq: {
    name: "Groq",
    costPer1kTokens: 0.0001,
    baseLatency: 100,
    baseAccuracy: 0.88,
    successes: 0,
    total: 0,
  },
  perplexity: {
    name: "Perplexity",
    costPer1kTokens: 0.005,
    baseLatency: 350,
    baseAccuracy: 0.90,
    successes: 0,
    total: 0,
  },
};

// Calculate adaptive accuracy based on success rate
function getAdaptiveAccuracy(engine: EngineProfile): number {
  if (engine.total === 0) return engine.baseAccuracy;
  const successRate = engine.successes / engine.total;
  return engine.baseAccuracy * (0.5 + 0.5 * successRate);
}

// Calculate adaptive latency (improves with more successful queries)
function getAdaptiveLatency(engine: EngineProfile): number {
  if (engine.total === 0) return engine.baseLatency;
  const successRate = engine.successes / engine.total;
  return engine.baseLatency * (1 - 0.2 * successRate); // Up to 20% improvement
}

// Scoring function: higher score = better choice
function scoreEngine(engine: EngineProfile): number {
  const adaptiveAccuracy = getAdaptiveAccuracy(engine);
  const adaptiveLatency = getAdaptiveLatency(engine);

  // Normalize metrics to 0-1 scale
  const accuracyScore = adaptiveAccuracy; // Already 0-1
  const latencyScore = 1 / (1 + adaptiveLatency / 100); // Inverse: lower latency = higher score
  const costScore = 1 / (1 + engine.costPer1kTokens * 1000); // Inverse: lower cost = higher score

  // Weighted scoring: accuracy (50%), latency (30%), cost (20%)
  return accuracyScore * 0.5 + latencyScore * 0.3 + costScore * 0.2;
}

// Choose best engine based on scoring
function chooseBestEngine(): EngineProfile {
  let bestEngine = engineStats.openai;
  let bestScore = scoreEngine(bestEngine);

  for (const engine of Object.values(engineStats)) {
    const score = scoreEngine(engine);
    if (score > bestScore) {
      bestScore = score;
      bestEngine = engine;
    }
  }

  return bestEngine;
}

// Simulate LLM response (in production, call actual APIs)
async function getEngineResponse(engineName: string, query: string): Promise<string> {
  // Simulate API latency
  const latency = engineStats[engineName.toLowerCase()]?.baseLatency || 200;
  await new Promise((resolve) => setTimeout(resolve, Math.random() * latency));

  // Mock responses based on engine
  const responses: Record<string, string> = {
    openai: `OpenAI Response: ${query} - This is a high-quality, detailed response from OpenAI's GPT model. It provides comprehensive analysis and nuanced understanding.`,
    gemini: `Gemini Response: ${query} - This is a balanced response from Google's Gemini model, offering good accuracy with efficient processing.`,
    groq: `Groq Response: ${query} - This is a fast response from Groq's inference engine, optimized for speed and efficiency.`,
    perplexity: `Perplexity Response: ${query} - This is a research-focused response from Perplexity AI, emphasizing accuracy and source verification.`,
  };

  return responses[engineName.toLowerCase()] || "Response from selected engine";
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // AI Router endpoint
  router: router({
    // Query the best engine
    query: publicProcedure
      .input(z.object({ query: z.string() }))
      .mutation(async ({ input }) => {
        const selectedEngine = chooseBestEngine();
        const reply = await getEngineResponse(selectedEngine.name, input.query);

        // Track the query attempt
        selectedEngine.total += 1;

        return {
          engine: selectedEngine.name,
          reply,
          score: scoreEngine(selectedEngine),
          stats: {
            successes: selectedEngine.successes,
            total: selectedEngine.total,
            successRate: selectedEngine.total > 0 ? selectedEngine.successes / selectedEngine.total : 0,
          },
        };
      }),

    // Record success/failure for adaptive learning
    recordFeedback: publicProcedure
      .input(z.object({ engine: z.string(), success: z.boolean() }))
      .mutation(({ input }) => {
        const engine = engineStats[input.engine.toLowerCase()];
        if (engine) {
          if (input.success) {
            engine.successes += 1;
          }
          return {
            success: true,
            stats: {
              successes: engine.successes,
              total: engine.total,
              successRate: engine.total > 0 ? engine.successes / engine.total : 0,
            },
          };
        }
        return { success: false };
      }),

    // Get engine stats for monitoring
    getStats: publicProcedure.query(() => {
      const stats: Record<string, any> = {};
      for (const [key, engine] of Object.entries(engineStats)) {
        stats[key] = {
          name: engine.name,
          score: scoreEngine(engine),
          successes: engine.successes,
          total: engine.total,
          successRate: engine.total > 0 ? engine.successes / engine.total : 0,
          adaptiveAccuracy: getAdaptiveAccuracy(engine),
          adaptiveLatency: getAdaptiveLatency(engine),
        };
      }
      return stats;
    }),

    // Reset stats (for testing)
    resetStats: publicProcedure.mutation(() => {
      for (const engine of Object.values(engineStats)) {
        engine.successes = 0;
        engine.total = 0;
      }
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
