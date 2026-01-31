
import { GoogleGenAI, Type } from "@google/genai";
import { RiskAnalysis } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeIncident = async (prompt: string): Promise<RiskAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following fire/disaster scenario in a Seoul urban context: "${prompt}". 
      Return a detailed risk assessment in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: {
              type: Type.STRING,
              description: "The calculated risk level: LOW, MEDIUM, HIGH, CRITICAL",
            },
            description: {
              type: Type.STRING,
              description: "Summary of the situation analysis",
            },
            recommendedAction: {
              type: Type.STRING,
              description: "Immediate strategic response action",
            },
            suggestedAIModels: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of relevant AI models to activate",
            },
          },
          required: ["riskLevel", "description", "recommendedAction", "suggestedAIModels"],
        },
      },
    });

    return JSON.parse(response.text.trim()) as RiskAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const fetchLiveSafetyNews = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "서울의 최신 화재 및 재난 안전 뉴스나 속보를 요약해서 3~4개 알려줘. 뉴스 제목과 간단한 설명을 포함해줘.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text,
      links: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title,
        uri: chunk.web?.uri,
      })).filter((c: any) => c.uri) || [],
    };
  } catch (error) {
    console.error("Safety News Fetch Error:", error);
    return null;
  }
};
