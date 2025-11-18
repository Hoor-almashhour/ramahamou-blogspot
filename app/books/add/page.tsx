"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // إنشاء slug تلقائي
  function generateSlug(title: string) {
    return title
    .toLowerCase()
    .trim()
    .replace(/[^\u0600-\u06FFa-zA-Z0-9\s-]/g, "") // إزالة الرموز فقط
    .replace(/\s+/g, "-") // مسافات → شرطة
    .replace(/-+/g, "-") // دمج الشرطات
    .replace(/^-+|-+$/g, ""); // إزالة الشرطات من البداية والنهاية
  }

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
   setLoading(true);

    const slug = generateSlug(title);

    const { error } = await supabase.from("books").insert([
      {
        title,
        text,
        date,
        slug,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("حدث خطأ أثناء الإضافة ❌");
      return;
    }

    alert("تمت إضافة الكتاب بنجاح ✔");
    router.push("/books");
  }

  return (
    <div className="max-w-3xl mx-auto py-36 px-4">
      <h1 className="text-3xl font-bold text-[#6B3074] mb-10 text-center">
        ➕ إضافة كتاب جديد
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-6"
      >
        {/* العنوان */}
        <div>
          <label className="block mb-2 font-semibold text-[#6B3074]">
            عنوان الكتاب
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* النص */}
        <div>
          <label className="block mb-2 font-semibold text-[#6B3074]">
            محتوى الكتاب
          </label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>

        {/* التاريخ */}
        <div>
          <label className="block mb-2 font-semibold text-[#6B3074]">
            التاريخ
          </label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#C39E71] text-white w-full py-3 rounded-lg text-lg font-semibold"
        >
          {loading ? "جارٍ الإضافة..." : "إضافة الكتاب"}
        </button>
      </form>
    </div>
  );
}
