// app/api/search/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase() || "";

  const { data, error } = await supabase
    .from("posts")
    .select("*");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const results = (data || []).filter(p => 
    p.title.toLowerCase().includes(query) ||
    (p.excerpt?.toLowerCase().includes(query)) ||
    (p.content?.toLowerCase().includes(query))
  );

  return NextResponse.json(results.slice(0, 10)); // أول 10 نتائج
}
