"use server";

import { GoogleGenAI } from "@google/genai";
import { env } from "@/env";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export async function generateArticle(topic: string) {
  const prompt = `
    You are a master tailor and textile engineer writing an editorial article for a luxury fabric brand.
    Write a long-form, technical markdown article about: "${topic}".
    The article must cover textile physics, bias layout diagrams (described in text), and seam stabilization guides.
    Return only valid markdown.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
  });

  return response.text || "";
}

export async function createBlog(prevState: any, formData: FormData) {
  const supabase = await createClient();
  
  const newBlog = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    content_markdown: formData.get("content") as string,
    excerpt: formData.get("excerpt") as string,
    is_published: formData.get("is_published") === "on",
  };

  const { error } = await supabase.from("blog_posts").insert(newBlog);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}
