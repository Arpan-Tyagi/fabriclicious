"use server";

import { GoogleGenAI } from "@google/genai";
import { env } from "@/env";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export async function generateProductSpecs(rawDescription: string) {
  const prompt = `
    You are an expert luxury textile archivist. Analyze this raw fabric description:
    "${rawDescription}"
    
    Extract and synthesize the following data into a strict JSON object:
    {
      "title": "Evocative luxury title",
      "slug": "url-friendly-slug",
      "description": "2-3 sentences of rich, editorial description",
      "care_instructions": "Dry clean only, etc.",
      "gsm": number,
      "width_cm": number,
      "weave": "twill, satin, plain, etc.",
      "drape": "ultra_fluid | fluid | moderate | structured | rigid"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function createProduct(prevState: any, formData: FormData) {
  const supabase = await createClient();
  
  // Extract and parse dynamic fiber composition
  const fibers = formData.getAll("fiber[]");
  const percentages = formData.getAll("percentage[]");
  
  let totalPct = 0;
  const composition: Record<string, number> = {};
  
  fibers.forEach((fiber, idx) => {
    const pct = parseInt(percentages[idx] as string) || 0;
    if (pct > 0) {
      composition[fiber as string] = pct;
      totalPct += pct;
    }
  });

  if (totalPct !== 100) {
    return { error: "Fiber composition must equal exactly 100%." };
  }

  const newProduct = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    care_instructions: formData.get("care_instructions") as string,
    base_price_per_meter: parseFloat(formData.get("price") as string),
    gsm: parseInt(formData.get("gsm") as string),
    width_cm: parseFloat(formData.get("width_cm") as string),
    weave: formData.get("weave") as string,
    drape: formData.get("drape") as string,
    composition,
    is_published: formData.get("is_published") === "on"
  };

  const { error } = await supabase.from("products").insert(newProduct);

  if (error) {
    return { error: error.message };
  }

  // INSTANT CACHE INVALIDATION
  revalidatePath("/fabrics");
  redirect("/admin/products");
}
