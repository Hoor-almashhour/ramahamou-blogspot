import { getAllPosts, getCategoriesAndTags } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";
import Hero from "./src/Components/Hero/Hero";
import PostCard from "./src/Components/PostCard/PostCard";
import AddPostButton from "./AddPostButton/page";

export default async function Home() {
  // 🟣 جلب المقالات من Supabase
  const posts = await getAllPosts();

  const featuredPosts = posts.slice(1, 4);

  const latestPosts = posts.slice(0);



  // 🟣 جلب التصنيفات والوسوم من قاعدة البيانات
  const { categories, tags } = await getCategoriesAndTags();

  return (
    <main className="min-h-screen bg-ramaBeige">
      {/* 🟣 قسم البطل */}
      <Hero />

      {/* 📌 مقالات مميزة */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-right">
        <h2 className="text-2xl font-bold text-black mb-6 pr-3">
          📌 مقالات مميزة
        </h2>

        {featuredPosts.length === 0 ? (
          <p className="text-gray-500">لا توجد مقالات بعد.</p>
        ) : (
          <div className="grid justify-center align-items md:grid-cols-3 gap-6">
            {featuredPosts.map((p) => (
              <PostCard key={p.id} post={p} />

            ))}
          </div>
        )}
      </section>

      {/* 📰 أحدث المقالات */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-right">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black pr-3">
            📰 أحدث المقالات
          </h2>
          <AddPostButton />
        </div>

        {latestPosts.length === 0 ? (
          <p className="text-gray-500">لا توجد مقالات لعرضها.</p>
        ) : (
          <div className="grid justify-center align-items md:grid-cols-4 gap-6">
            {latestPosts.map((p) => (
             <PostCard key={p.id} post={p} />

            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/archive"
            className="inline-block bg-[#C39E71] text-white px-6 py-2 rounded-full hover:bg-[#c1935a] transition"
          >
            جميع المقالات
          </Link>
        </div>
      </section>

      {/* 🧭 روابط سريعة */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-right">
          <h3 className="text-2xl font-semibold text-ramaPurple mb-4">
            🧭 روابط سريعة
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((c) => (
              <Link
                key={c}
                href={`/archive?category=${encodeURIComponent(c)}`}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-[#c1935a] transition"
              >
                {c}
              </Link>
            ))}
          </div>

          <h4 className="text-xl font-semibold text-ramaPurple mt-8 mb-3">
            الوسوم الشائعة
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {tags.map((t) => (
              <Link
                key={t}
                href={`/archive?tag=${encodeURIComponent(t)}`}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full  hover:bg-[#c1935a] transition"
              >
                #{t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 📷 معرض صور صغير */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h3 className="text-2xl font-bold text-ramaPurple mb-6">
          📷 لقطات من المقالات
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.slice(0, 8).map((p)=>(
            <img
             key={p.id}
              src={p.meta.image }
              alt={p.meta.title}
              className="w-full h-40 object-cover rounded-2xl shadow hover:opacity-80 transition"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
