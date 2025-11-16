import { supabase } from "./supabaseClient";

/* ---------------------------------------------------
   🟣 جلب جميع المقالات
--------------------------------------------------- */
export async function getAllPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }

  return data.map((p) => ({
     id: p.id,  
    slug: p.slug,
    meta: {
      title: p.title,
      date: p.created_at,
      excerpt: p.excerpt,
      category: p.category || "غير مصنف",
      tags: p.tags || [],
      image: p.image_url || "",
    },
    content: p.content,
  }));
}

/* ---------------------------------------------------
   🟣 جلب مقال بواسطة الـ slug
--------------------------------------------------- */
export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return {
    slug: data.slug,
    meta: {
      title: data.title,
      date: data.created_at,
      excerpt: data.excerpt,
      category: data.category || "غير مصنف",
      tags: data.tags || [],
      image: data.image_url || "",
    },
    content: data.content,
  };
}

/* ---------------------------------------------------
   🟣 جلب جميع التصنيفات والوسوم
--------------------------------------------------- */

  export async function getCategoriesAndTags() {
    const posts = await getAllPosts();

    const categories = new Set<string>();
    const tags = new Set<string>();

    posts.forEach((p) => {
      if (p.meta.category) categories.add(p.meta.category);

      if (Array.isArray(p.meta.tags)) {
        // بعض الوسوم مخزنة كسلسلة "[tag1,tag2]" → حولها لمصفوفة
        p.meta.tags.forEach((t: string) => {
          const cleanedTags: string[] = t.replace(/[\[\]]/g, '').split(',').map((x: string) => x.trim());
          cleanedTags.forEach((tag: string) => tags.add(tag));
        });
      } else if (typeof p.meta.tags === 'string') {
        const cleanedTags: string[] = p.meta.tags.replace(/[\[\]]/g, '').split(',').map((x: string) => x.trim());
        cleanedTags.forEach((tag: string) => tags.add(tag));
      }
    });

    return {
      categories: Array.from(categories),
      tags: Array.from(tags),
    };
  }


/* ---------------------------------------------------
   🟣 جلب المقالات حسب التصنيف
--------------------------------------------------- */
export async function getPostsByCategory(category: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((p) => ({
    slug: p.slug,
    meta: {
      title: p.title,
      date: p.created_at,
      excerpt: p.excerpt,
      category: p.category,
      tags: p.tags || [],
      image: p.image_url,
    },
    content: p.content,
  }));
}

/* ---------------------------------------------------
   🟣 جلب المقالات حسب الوسم
--------------------------------------------------- */
export async function getPostsByTag(tag: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .contains("tags", [tag]) // يبحث داخل مصفوفة الوسوم
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((p) => ({
    slug: p.slug,
    meta: {
      title: p.title,
      date: p.created_at,
      excerpt: p.excerpt,
      category: p.category,
      tags: p.tags || [],
      image: p.image_url,
    },
    content: p.content,
  }));
}
