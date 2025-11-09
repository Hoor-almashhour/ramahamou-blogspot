import { getAllPosts, getCategoriesAndTags } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";
import Hero from "./src/Components/Hero/Hero";
import PostCard from "./src/Components/PostCard/PostCard";

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3); // 🟣 أول مقالتين كمقالات مميزة
  const latestPosts = posts.slice(2, 6);   // 🟣 أحدث 3 مقالات
  const { categories, tags } = await getCategoriesAndTags();

  return (
    <main className="min-h-screen bg-ramaBeige">
      {/* 🟣 قسم البطل */}
      <Hero />

      {/* 📌 قسم المقالات المميزة */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-right">
        <h2 className="text-2xl font-bold text-black mb-6 pr-3">
          📌 مقالات مميزة
        </h2>
        <div className="grid justify-center align-items md:grid-cols-3 gap-6">
          {featuredPosts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* 📰 أحدث المقالات */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-right">
        <h2 className="text-2xl font-bold text-black mb-6  pr-3">
          📰 أحدث المقالات
        </h2>
        <div className="grid justify-center align-items md:grid-cols-4 gap-6">
          {latestPosts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/archive"
            className="inline-block bg-[#C39E71]   text-white  px-6 py-2 rounded-full hover:bg-[#c1935a]  transition"
          >
             جميع المقالات
          </Link>
        </div>
      </section>

      {/* 🧭 الروابط السريعة: التصنيفات والوسوم */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-right">
          <h3 className="text-2xl font-semibold text-ramaPurple mb-4">
            🧭 روابط سريعة
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((c) => (
              <Link
                key={c}
                href={`/category/${encodeURIComponent(c)}`}
                className="bg-gray-100 text-gray-700 px-4 py-2  rounded-full hover:bg-ramaGold hover:text-[#C39E71]  transition"
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
                href={`/tag/${encodeURIComponent(t)}`}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-ramaGold hover:text-[#C39E71]  transition"
              >
                #{t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 📷 معرض صور صغير من المقالات */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h3 className="text-2xl font-bold text-ramaPurple mb-6">📷 لقطات من المقالات</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.slice(0, 8).map((p) => (
            <Image
              key={p.slug}
              src={p.meta.image || "/images/placeholder.jpg"}
              alt={p.meta.title}
              width={400}
              height={300}
              className="w-full h-40 object-cover rounded-2xl cursor-pointer shadow hover:opacity-80 transition"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized
            />
          ))}
        </div>
      </section>

      {/* 📬 الاشتراك بالنشرة البريدية */}
      <section className="bg-gray-100 py-16 text-center text-black">
        <h3 className="text-2xl font-bold mb-4">📬 الاشتراك في القائمة البريدية</h3>
        <p className="mb-6 text-black">
          احصل على أحدث المقالات مباشرة إلى بريدك الإلكتروني
        </p>
        <form className="flex flex-col justify-center gap-3 max-w-md p-4 mx-auto">
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            className="w-full px-4 py-2 rounded-full border-2 text-right text-gray-600 focus:outline-2 outline-[#C39E71]"
            required
          />
          <button
            type="submit"
            className="bg-[#C39E71] w-full text-black px-6 py-2 rounded-full hover:bg-ramaBeige hover:text-ramaPurple transition"
          >
            اشتراك
          </button>
        </form>
      </section>
    </main>
  );
}
