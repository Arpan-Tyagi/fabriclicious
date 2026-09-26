import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function BlogsPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-serif text-4xl mb-2">Editorial Blogs</h1>
          <p className="font-mono text-xs uppercase text-umber/60">Manage Tailoring Articles</p>
        </div>
        <Link href="/admin/blogs/new" className="bg-umber text-linen px-6 py-2 rounded-full font-medium">
          Write Article
        </Link>
      </div>

      <div className="grid gap-4">
        {blogs?.map((blog: any) => (
          <div key={blog.id} className="p-6 bg-limestone rounded-2xl border border-hemp flex justify-between items-center">
            <div>
              <h3 className="font-serif text-2xl">{blog.title}</h3>
              <p className="font-sans text-sm text-umber/70">{blog.excerpt}</p>
            </div>
            <div className="text-right">
              <span className={`text-xs px-2 py-1 rounded-full ${blog.is_published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                {blog.is_published ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
