import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// دالة صغيرة لاستخراج العنوان من frontmatter
function extractTitle(content: string) {
  const match = content.match(/title:\s*["']?(.+?)["']?(?:\r?\n|$)/);
  return match ? match[1] : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase() || "";

  const postsDir = path.join(process.cwd(), "content/posts"); // ✅ هنا مجلد مقالاتك
  const files = fs.readdirSync(postsDir);

  const results = files
    .filter(file => file.endsWith(".md") || file.endsWith(".mdx") || file.endsWith(".tsx"))
    .map(file => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");

      const title = extractTitle(content) || file.replace(/\.(md|mdx|tsx)$/, "");
      const href = `/posts/${file.replace(/\.(md|mdx|tsx)$/, "")}`;

      return { title, href, content };
    })
    .filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    );

  return NextResponse.json(results.slice(0, 10)); // أول 10 نتائج فقط
}
