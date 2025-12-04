import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the API client
// Note: process.env.API_KEY is assumed to be injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Meta-Learner" and "Strategy Analyst" for the sm_attaker_beta trading system. 
Your role is to explain trading decisions, analyze market regimes, and provide rationale based on technical features (RSI, Order Blocks, FVG) and macro sentiment.

Context:
- The system uses a hierarchical agent architecture.
- Current Market Regime: High Volatility / Trending.
- Winning Strategy: Momentum Breakout with Volume Confirmation.
- You have access to a RAG system (simulated here) that retrieves news and strategy documents.

Tone: Professional, analytical, concise, and data-driven. 
When asked about "Why", cite specific indicators or news sentiment.
Do not give financial advice. Always frame answers as "System Logic".
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result = await chat.sendMessage({ message });
    return result.text || "System could not generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to the Cognitive Intelligence Layer. Please check API configuration.";
  }
};