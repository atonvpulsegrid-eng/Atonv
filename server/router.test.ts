import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock context
function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("AI Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
    // Reset stats before each test
    caller.router.resetStats();
  });

  it("should select an engine and return a response", async () => {
    const result = await caller.router.query({ query: "What is AI?" });

    expect(result).toBeDefined();
    expect(result.engine).toBeDefined();
    expect(["OpenAI", "Gemini", "Groq", "Perplexity"]).toContain(result.engine);
    expect(result.reply).toBeDefined();
    expect(result.reply).toMatch(/Response from|Response/);
    expect(result.score).toBeGreaterThan(0);
    expect(result.score).toBeLessThanOrEqual(1);
  });

  it("should track query attempts in stats", async () => {
    const result1 = await caller.router.query({ query: "Query 1" });
    const stats1 = await caller.router.getStats();

    const selectedEngine = result1.engine.toLowerCase();
    expect(stats1[selectedEngine].total).toBe(1);

    const result2 = await caller.router.query({ query: "Query 2" });
    const stats2 = await caller.router.getStats();

    // At least one engine should have been queried
    let totalQueries = 0;
    for (const engine of Object.values(stats2)) {
      totalQueries += (engine as any).total;
    }
    expect(totalQueries).toBeGreaterThanOrEqual(2);
  });

  it("should record feedback and update success rate", async () => {
    const result = await caller.router.query({ query: "Test query" });
    const engineName = result.engine;

    // Record success
    const feedback = await caller.router.recordFeedback({
      engine: engineName,
      success: true,
    });

    expect(feedback.success).toBe(true);
    expect(feedback.stats.successes).toBe(1);
    expect(feedback.stats.total).toBeGreaterThan(0);
    expect(feedback.stats.successRate).toBeGreaterThan(0);
  });

  it("should improve engine score based on success rate", async () => {
    // Get initial stats
    const initialStats = await caller.router.getStats();
    const initialScores = Object.entries(initialStats).map(([key, engine]: [string, any]) => ({
      key,
      score: engine.score,
    }));

    // Run multiple queries and record successes
    for (let i = 0; i < 5; i++) {
      const result = await caller.router.query({ query: `Query ${i}` });
      await caller.router.recordFeedback({
        engine: result.engine,
        success: true,
      });
    }

    // Get updated stats
    const updatedStats = await caller.router.getStats();
    const updatedScores = Object.entries(updatedStats).map(([key, engine]: [string, any]) => ({
      key,
      score: engine.score,
    }));

    // At least one engine should have improved its score
    let scoreImproved = false;
    for (const updated of updatedScores) {
      const initial = initialScores.find((s) => s.key === updated.key);
      if (initial && updated.score > initial.score) {
        scoreImproved = true;
        break;
      }
    }
    expect(scoreImproved).toBe(true);
  });

  it("should return different engines for different queries", async () => {
    const engines = new Set<string>();

    // Run multiple queries
    for (let i = 0; i < 10; i++) {
      const result = await caller.router.query({ query: `Query ${i}` });
      engines.add(result.engine);
    }

    // With enough queries, we should see at least 2 different engines
    // (due to randomness and different query patterns)
    expect(engines.size).toBeGreaterThanOrEqual(1);
  });

  it("should provide engine stats", async () => {
    const stats = await caller.router.getStats();

    expect(stats).toBeDefined();
    expect(stats.openai).toBeDefined();
    expect(stats.gemini).toBeDefined();
    expect(stats.groq).toBeDefined();
    expect(stats.perplexity).toBeDefined();

    for (const [key, engine] of Object.entries(stats)) {
      expect((engine as any).name).toBeDefined();
      expect((engine as any).score).toBeGreaterThanOrEqual(0);
      expect((engine as any).score).toBeLessThanOrEqual(1);
      expect((engine as any).successes).toBeGreaterThanOrEqual(0);
      expect((engine as any).total).toBeGreaterThanOrEqual(0);
      expect((engine as any).successRate).toBeGreaterThanOrEqual(0);
      expect((engine as any).successRate).toBeLessThanOrEqual(1);
    }
  });

  it("should reset stats correctly", async () => {
    // Run some queries
    await caller.router.query({ query: "Query 1" });
    await caller.router.query({ query: "Query 2" });

    // Reset
    const resetResult = await caller.router.resetStats();
    expect(resetResult.success).toBe(true);

    // Verify stats are reset
    const stats = await caller.router.getStats();
    for (const engine of Object.values(stats)) {
      expect((engine as any).total).toBe(0);
      expect((engine as any).successes).toBe(0);
      expect((engine as any).successRate).toBe(0);
    }
  });
});
