
import { GoogleGenAI, Type } from "@google/genai";
import { RiskAnalysis } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * 텍스트 또는 이미지를 포함한 시나리오 분석 (결과 한글 출력)
 */
export const analyzeIncident = async (prompt: string, imageBase64?: string): Promise<RiskAnalysis> => {
  try {
    const parts: any[] = [{ text: `서울의 화재/재난 시나리오를 분석해주세요: "${prompt}". 
      이미지가 제공된 경우, 사진 속의 특정 위험 요소(불길, 연기, 가연물), 구조가 필요한 인원, 건물 붕괴 위험 등을 식별하세요.
      
      [지침]
      1. 모든 분석 내용(description, recommendedAction, suggestedAIModels)은 반드시 한국어로 작성하세요.
      2. 'riskLevel'은 반드시 다음 중 하나여야 합니다: 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'.
      3. 'suggestedAIModels'에는 해당 상황 분석에 도움이 될 구체적인 AI 모델 명칭(예: 연기 확산 예측 모델, 실시간 인원 탐지 모델 등)을 한글로 나열하세요.` }];
    
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64.split(',')[1] // base64 데이터만 추출
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: {
              type: Type.STRING,
              description: "위험 등급: LOW, MEDIUM, HIGH, CRITICAL 중 하나",
            },
            description: {
              type: Type.STRING,
              description: "현장 상황 및 시각적 위험 요소에 대한 상세한 한글 분석 요약",
            },
            recommendedAction: {
              type: Type.STRING,
              description: "데이터와 이미지 기반의 즉각적인 한글 권장 대응 전략",
            },
            suggestedAIModels: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "활성화가 권장되는 AI 기술/모델 목록 (한글)",
            },
          },
          required: ["riskLevel", "description", "recommendedAction", "suggestedAIModels"],
        },
      },
    });

    return JSON.parse(response.text.trim()) as RiskAnalysis;
  } catch (error) {
    console.error("Gemini Multi-modal Error:", error);
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
