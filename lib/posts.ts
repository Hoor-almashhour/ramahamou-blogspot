import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "posts");

// 🟣 جلب جميع المقالات
export async function getAllPosts() {
  const files = fs.readdirSync(postsDir);
  const posts = files.map((filename) => {
    
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
    const filePath = path.join(postsDir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      meta: {
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || content.slice(0, 200) + "...",
        category: data.category || "غير مصنف",
        tags: data.tags || [],
        image: data.image || "",
      },
      content,
    };
  });

  // 🔸 ترتيب المقالات من الأحدث إلى الأقدم
  posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

  return posts;
}

// 🟣 جلب مقال واحد حسب slug
export async function getPostBySlug(slug: string) {
  // ابحث عن الملف الذي ينتهي بـ `${slug}.md` أو يحتوي على `-${slug}.md`
  const filename = fs
    .readdirSync(postsDir)
    .find(
      (f) =>
        f === `${slug}.md` ||
        f.endsWith(`-${slug}.md`) ||
        f.includes(`-${slug}.md`)
    );

  if (!filename) return null;

  const filePath = path.join(postsDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    meta: {
      title: data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
      category: data.category || "غير مصنف",
      tags: data.tags || [],
      image: data.image || "",
    },
    content,
  };
}

// 🟣 جلب جميع التصنيفات والكلمات المفتاحية للأرشيف
export async function getCategoriesAndTags() {
  const posts = await getAllPosts();

  const categoriesSet = new Set<string>();
  const tagsSet = new Set<string>();

  posts.forEach((p) => {
    if (p.meta.category) categoriesSet.add(p.meta.category);
    if (Array.isArray(p.meta.tags)) {
      p.meta.tags.forEach((t: string) => tagsSet.add(t));
    }
  });

  return {
    categories: Array.from(categoriesSet),
    tags: Array.from(tagsSet),
  };
}

// 🟣 جلب المقالات حسب التصنيف
export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts();
  return posts.filter((p) => p.meta.category === category);
}

// 🟣 جلب المقالات حسب الوسم (Tag)
export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts();
  return posts.filter(
    (p) => Array.isArray(p.meta.tags) && p.meta.tags.includes(tag)
  );
}
