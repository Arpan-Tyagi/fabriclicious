"use client";

import { useState, useActionState } from "react";
import { createBlog, generateArticle } from "./actions";

export default function NewBlogStudio() {
  const [state, formAction, isPending] = useActionState(createBlog, null);
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAI = async () => {
    const topic = prompt("Enter article topic (e.g. 'Working with silk bias', 'Stabilizing velvet seams'):");
    if (!topic) return;
    setIsGenerating(true);
    try {
      const generated = await generateArticle(topic);
      setContent(generated);
    } catch (e) {
      alert("AI Generation failed.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-serif text-4xl mb-2">Blog Studio</h1>
          <p className="font-mono text-xs uppercase text-umber/60">Write a technical tailoring article</p>
        </div>
        <button 
          type="button"
          onClick={handleAI}
          disabled={isGenerating}
          className="bg-loam text-umber px-6 py-2 rounded-full font-medium"
        >
          {isGenerating ? "Drafting..." : "✨ AI Auto-Write"}
        </button>
      </div>

      <form action={formAction} className="space-y-8 bg-limestone p-8 rounded-2xl border border-hemp shadow-sm">
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-umber/70">Title</label>
            <input name="title" required className="luxury-input w-full p-2 border border-hemp rounded" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-umber/70">Slug</label>
            <input name="slug" required className="luxury-input w-full p-2 border border-hemp rounded" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-umber/70">Excerpt</label>
          <textarea name="excerpt" required rows={2} className="luxury-input resize-none w-full p-2 border border-hemp rounded" />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-umber/70">Content (Markdown)</label>
          <textarea 
            name="content" 
            required 
            rows={15} 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="luxury-input w-full font-mono text-sm p-2 border border-hemp rounded" 
          />
        </div>

        {state?.error && <p className="text-red-500 text-sm font-medium">{state.error}</p>}

        <div className="flex items-center justify-between pt-8 border-t border-hemp">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="is_published" className="accent-umber w-4 h-4" />
            <span className="text-sm font-medium">Publish immediately</span>
          </label>
          <button 
            type="submit" 
            disabled={isPending}
            className="luxury-button disabled:opacity-50 px-6 py-2 bg-umber text-linen rounded"
          >
            {isPending ? "Saving..." : "Save to Database"}
          </button>
        </div>

      </form>
    </div>
  );
}
