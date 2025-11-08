import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase() || "";

  const postsDir = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDir);

  const results = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".tsx"))
    .map((file) => {
      const content = fs.readFileSync(path.join(postsDir, file), "utf-8");
      return {
        title: file.replace(/\.(md|tsx)$/, ""),
        href: `/posts/${file.replace(/\.(md|tsx)$/, "")}`,
        content,
      };
    })
    .filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
    );

  return NextResponse.json(results.slice(0, 10)); // أول 10 نتائج فقط
}
