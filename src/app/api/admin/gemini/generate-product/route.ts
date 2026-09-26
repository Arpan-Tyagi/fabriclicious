import { NextResponse } from "next/server";
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { env } from "@/env";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { rawDescription } = await req.json();

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        editorialTitle: { type: Type.STRING },
        tagline: { type: Type.STRING },
        narrativeDescription: { type: Type.STRING },
        recommendedSilhouettes: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        atelierSewingNotes: {
          type: Type.OBJECT,
          properties: {
            recommendedNeedleSize: { type: Type.STRING },
            threadType: { type: Type.STRING },
            pressFootAdvice: { type: Type.STRING }
          }
        },
        seo: {
          type: Type.OBJECT,
          properties: {
            metaTitle: { type: Type.STRING },
            metaDescription: { type: Type.STRING },
            slugSuggestion: { type: Type.STRING }
          }
        }
      }
    };

    const prompt = `
      You are an expert luxury textile archivist. Analyze this raw fabric description:
      "${rawDescription}"
      
      Generate a product specification for the storefront.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    return NextResponse.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
