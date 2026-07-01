// SKYCOIN4444 - Hope AI Real LLM Integration
// Full integration with Manus Forge LLM API

import { invokeLLM, listLLMModels } from "./_core/llm";
import { db } from "./db";
import { hopeAIChatHistory } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIConversation {
  id: string;
  userId: string;
  title: string;
  messages: AIMessage[];
  capability: "chat" | "code" | "image" | "video" | "document" | "search" | "reasoning" | "analysis" | "creative" | "voice" | "vision" | "learning";
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Execute Hope AI with real LLM backend
 */
export async function executeHopeAI(
  userId: string,
  userMessage: string,
  capability: string = "chat",
  conversationId?: string
): Promise<{ response: string; conversationId: string; tokens: number }> {
  try {
    // Get or create conversation
    let convId = conversationId;
    if (!convId) {
      convId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Get conversation history
    const history = await db
      .select()
      .from(hopeAIChatHistory)
      .where(eq(hopeAIChatHistory.sessionId, convId))
      .limit(10);

    // Build message context based on capability
    const systemPrompt = getSystemPrompt(capability);
    const messages: AIMessage[] = [
      { role: "system", content: systemPrompt },
      ...history.map(m => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: userMessage },
    ];

    // Call real LLM
    const response = await invokeLLM({
      messages,
      model: "claude-sonnet-4-6", // Use best available model

    });

    const assistantContent = response.choices[0]?.message?.content || "No response";
    const assistantMessage = typeof assistantContent === "string" ? assistantContent : "No response";
    const tokenCount = response.usage?.total_tokens || 0;

    // Save conversation
    await db.insert(hopeAIChatHistory).values({
      userId: parseInt(userId),
      role: "user",
      content: userMessage,
      sessionId: convId,
      createdAt: Date.now(),
    });

    await db.insert(hopeAIChatHistory).values({
      userId: parseInt(userId),
      role: "assistant",
      content: assistantMessage,
      sessionId: convId,
      createdAt: Date.now(),
    });

    return {
      response: assistantMessage,
      conversationId: convId,
      tokens: tokenCount,
    };
  } catch (error) {
    console.error("[Hope AI] LLM execution failed:", error);
    throw new Error(`Hope AI failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Get system prompt based on capability
 */
function getSystemPrompt(capability: string): string {
  const prompts: Record<string, string> = {
    chat: "You are Hope AI, a helpful assistant. Provide clear, concise answers.",
    code: "You are an expert software engineer. Write clean, well-documented code. Explain your reasoning.",
    image: "You are an expert in image generation and visual design. Provide detailed descriptions for image generation.",
    video: "You are an expert in video analysis and production. Analyze videos and provide insights.",
    document: "You are an expert document analyst. Extract key information and summarize documents.",
    search: "You are a research assistant. Search for and synthesize information from multiple sources.",
    reasoning: "You are a logical reasoning expert. Break down complex problems step by step.",
    analysis: "You are a data analyst. Analyze data and provide actionable insights.",
    creative: "You are a creative writer. Generate engaging, original content.",
    voice: "You are a voice assistant. Provide clear, conversational responses.",
    vision: "You are a computer vision expert. Analyze images and describe what you see.",
    learning: "You are an educational expert. Explain concepts clearly and provide learning resources.",
  };

  return prompts[capability] || prompts.chat;
}

/**
 * Get temperature based on capability
 */
function getTemperature(capability: string): number {
  const temps: Record<string, number> = {
    chat: 0.7,
    code: 0.2, // Low for deterministic code
    image: 0.8, // High for creative descriptions
    video: 0.5,
    document: 0.3, // Low for accuracy
    search: 0.5,
    reasoning: 0.2, // Low for logical consistency
    analysis: 0.3, // Low for accuracy
    creative: 0.9, // High for creativity
    voice: 0.7,
    vision: 0.5,
    learning: 0.6,
  };

  return temps[capability] || 0.7;
}

/**
 * Get max tokens based on capability
 */
function getMaxTokens(capability: string): number {
  const maxTokens: Record<string, number> = {
    chat: 2000,
    code: 4000, // More tokens for code
    image: 1000,
    video: 2000,
    document: 3000, // More tokens for analysis
    search: 2000,
    reasoning: 3000, // More tokens for reasoning
    analysis: 2500,
    creative: 2000,
    voice: 1500,
    vision: 2000,
    learning: 2000,
  };

  return maxTokens[capability] || 2000;
}

/**
 * Generate image with Hope AI
 */
export async function generateImageWithHopeAI(
  userId: string,
  prompt: string
): Promise<{ imageUrl: string; tokens: number }> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an expert in image generation. Provide detailed, vivid descriptions for DALL-E.",
        },
        {
          role: "user",
          content: `Generate an image with this description: ${prompt}`,
        },
      ],
      model: "claude-sonnet-4-6",
    });

    // In production, would call actual image generation API
    // For now, return placeholder
    return {
      imageUrl: `https://placeholder.com/512x512?text=${encodeURIComponent(prompt)}`,
      tokens: response.usage?.total_tokens || 0,
    };
  } catch (error) {
    console.error("[Hope AI] Image generation failed:", error);
    throw error;
  }
}

/**
 * Analyze document with Hope AI
 */
export async function analyzeDocumentWithHopeAI(
  userId: string,
  documentContent: string,
  analysisType: string = "summary"
): Promise<{ analysis: string; tokens: number }> {
  try {
    const analysisPrompts: Record<string, string> = {
      summary: "Provide a concise summary of this document.",
      extract: "Extract all key information from this document.",
      sentiment: "Analyze the sentiment and tone of this document.",
      keywords: "Extract the top 10 keywords from this document.",
    };

    const prompt = analysisPrompts[analysisType] || analysisPrompts.summary;

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an expert document analyst. Provide accurate, detailed analysis.",
        },
        {
          role: "user",
          content: `${prompt}\n\nDocument:\n${documentContent}`,
        },
      ],
      model: "claude-sonnet-4-6",
    });

    const analysisContent = response.choices[0]?.message?.content || "No analysis";
    const analysisStr = typeof analysisContent === "string" ? analysisContent : "No analysis";
    return {
      analysis: analysisStr,
      tokens: response.usage?.total_tokens || 0,
    };
  } catch (error) {
    console.error("[Hope AI] Document analysis failed:", error);
    throw error;
  }
}

/**
 * Code generation with Hope AI
 */
export async function generateCodeWithHopeAI(
  userId: string,
  description: string,
  language: string = "typescript"
): Promise<{ code: string; explanation: string; tokens: number }> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an expert ${language} developer. Write clean, well-documented code with explanations.`,
        },
        {
          role: "user",
          content: `Generate ${language} code for: ${description}`,
        },
      ],
      model: "claude-sonnet-4-6",
    });

    const content = response.choices[0]?.message?.content || "";
    const contentStr = typeof content === "string" ? content : "";
    const [code, explanation] = contentStr.split("---") || [contentStr, ""];

    return {
      code: code.trim(),
      explanation: explanation.trim(),
      tokens: response.usage?.total_tokens || 0,
    };
  } catch (error) {
    console.error("[Hope AI] Code generation failed:", error);
    throw error;
  }
}

/**
 * Get available LLM models
 */
export async function getAvailableModels() {
  try {
    const { data } = await listLLMModels();
    return data.map(m => ({
      id: m.id,
      name: m.id.split("/").pop() || m.id,
      provider: m.id.includes("claude") ? "Anthropic" : m.id.includes("gpt") ? "OpenAI" : "Unknown",
      contextWindow: 4096,
    }));
  } catch (error) {
    console.error("[Hope AI] Failed to list models:", error);
    return [];
  }
}

/**
 * Export conversation as markdown
 */
export async function exportConversationAsMarkdown(conversationId: string): Promise<string> {
  try {
    const messages = await db
      .select()
      .from(hopeAIChatHistory)
      .where(eq(hopeAIChatHistory.sessionId, conversationId))
      .orderBy(hopeAIChatHistory.createdAt);

    let markdown = `# Hope AI Conversation\n\n`;
    markdown += `**Exported:** ${new Date().toISOString()}\n\n`;

    for (const msg of messages) {
      if (msg.role === "user") {
        markdown += `## User\n\n${msg.content}\n\n`;
      } else {
        markdown += `## Hope AI\n\n${msg.content}\n\n`;
      }
    }

    return markdown;
  } catch (error) {
    console.error("[Hope AI] Export failed:", error);
    throw error;
  }
}
