
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const posts = data.map(p => ({
    title: p.title,
    date: p.created_at,
    href: `/posts/${p.slug}`,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
  }));

  return NextResponse.json(posts);
}
