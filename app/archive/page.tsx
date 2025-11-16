import Link from "next/link";
import Image from "next/image";
import {
  getCategoriesAndTags,
  getPostsByCategory,
  getPostsByTag,
  getAllPosts,
} from "@/lib/posts";

// 🟣 تعريف نوع المقال
type Post = {
  slug: string;
  meta: {
    title: string;
    date: string;
    excerpt: string;
    category?: string;
    tags?: string[];
    image: string;
  };
  content: string;
};

interface ArchivePageProps {
  searchParams?: Promise<{ category?: string; tag?: string }> | { category?: string; tag?: string };
}

export default async function ArchivePage({ searchParams }: ArchivePageProps) {
  // ✅ فك الـ Promise إذا كانت موجودة
  const params = await searchParams;
  const category = params?.category;
  const tag = params?.tag;

  // 🟣 جلب التصنيفات والوسوم
  const { categories, tags } = await getCategoriesAndTags();

  // 🟣 جلب المقالات حسب الفلتر
  let posts: Post[] = [];
  let filterTitle = "كل المقالات";

  if (category) {
    posts = await getPostsByCategory(category);
    filterTitle = `تصنيف: ${category}`;
  } else if (tag) {
    posts = await getPostsByTag(tag);
    filterTitle = `وسم: ${tag}`;
  } else {
    posts = await getAllPosts();
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-36 text-right">
      <h1 className="text-3xl font-bold text-[#C39E71] mb-8">الأرشيف</h1>

      <div className="flex flex-col-reverse md:flex-row-reverse gap-8">

        {/* 🟣 القائمة الجانبية */}
        <aside className="md:w-1/3 bg-white p-6 rounded-2xl shadow-sm h-fit">
          {/* التصنيفات */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-ramaPurple mb-3">التصنيفات</h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/archive?category=${encodeURIComponent(cat)}`}
                    className="text-ramaGold hover:underline"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* الوسوم */}
          <div>
            <h2 className="text-xl font-semibold text-ramaPurple mb-3">الوسوم</h2>
            <div className="flex flex-wrap justify-end gap-2">
              {tags.map((t) => (
                <Link
                  key={t}
                  href={`/archive?tag=${encodeURIComponent(t)}`}
                  className="bg-ramaBeige border border-ramaGold text-ramaPurple px-3 py-1 rounded-full text-sm hover:bg-[#C39E71] transition"
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* 🟣 قائمة المقالات */}
        <main className="flex-1">
          <h2 className="text-2xl font-semibold text-black mb-6">{filterTitle}</h2>

          {posts.length === 0 ? (
            <p className="text-gray-500">لا توجد مقالات لعرضها حسب الفلتر المحدد.</p>
          ) : (
            <ul className="space-y-6 flex flex-col items-end">
              {posts.map((p) => (
                <li
                  key={p.slug}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-md transition w-full md:max-w-2xl"
                >
                  <Link href={`/posts/${p.slug}`}>
                    <Image
                      src={p.meta.image || "/images/placeholder.jpg"}
                      alt={p.meta.title}
                      width={400}
                      height={350}
                      className="rounded mb-4 object-cover w-full"
                      unoptimized
                    />
                    <h3 className="text-lg font-bold text-ramaPurple mb-1">
                      {p.meta.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{p.meta.date}</p>
                    <p className="text-gray-700 line-clamp-2">{p.meta.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </main>

      </div>
    </section>
  );
}
