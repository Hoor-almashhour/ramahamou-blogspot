import Link from "next/link";
import Image from "next/image";
import { getCategoriesAndTags, getPostsByCategory, getPostsByTag, getAllPosts } from "@/lib/posts"

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

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string };
}) {
  const { categories, tags } = await getCategoriesAndTags();

  // 🟣 هنا نحدد النوع صراحةً
  let posts: Post[] = [];
  let filterTitle = "كل المقالات";

  if (searchParams.category) {
    posts = await getPostsByCategory(searchParams.category);
    filterTitle = `تصنيف: ${searchParams.category}`;
  } else if (searchParams.tag) {
    posts = await getPostsByTag(searchParams.tag);
    filterTitle = `وسم: ${searchParams.tag}`;
  } else {
    posts = await getAllPosts(); // نعرض الكل افتراضيًا
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-36 text-right">
      <h1 className="text-3xl font-bold text-[#C39E71] mb-8">الأرشيف</h1>

      <div className="flex flex-col-reverse justify-center items-center md:flex-row-reverse  md:justify-start md:items-start  gap-8">
        {/* العمود الجانبي */}
        <aside className="md:w-1/3">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-ramaPurple">التصنيفات</h2>
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

          <div>
            <h2 className="text-xl font-semibold mb-3 text-ramaPurple">الوسوم</h2>
            <div className="flex flex-wrap items-center justify-end gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/archive?tag=${encodeURIComponent(tag)}`}
                  className="bg-ramaBeige border border-ramaGold text-ramaPurple px-3 py-1 rounded-full text-sm hover:bg-ramaGold hover:text-white transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* قائمة المقالات */}
        <main className="flex-1 ">
          <h2 className="text-2xl font-semibold text-black mb-4">{filterTitle}</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500">اختر تصنيفًا أو وسمًا لعرض المقالات.</p>
          ) : (
            <ul className="space-y-4 flex  flex-col md:items-end md:justify-end ">
              {posts.map((p) => (
                <li
                  key={p.slug}
                  className="p-4 bg-white max-w-2xl md:w-2xl  rounded shadow hover:shadow-md transition "
                >
                  <Link href={`/posts/${p.slug}`}>
                    <Image 
                            src={p.meta.image}
                            alt={p.meta.title} 
                            width={400}
                            height={400}
                            className="mx-auto mb-4 "
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized
                        />
                        <h3 className="text-lg font-bold text-ramaPurple mb-1">{p.meta.title}</h3>
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
