"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { FaWhatsapp } from "react-icons/fa";

interface Book {
  id: number;
  title: string;
  text: string;
  date: string;
  slug: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      const { data } = await supabase.from("books").select("*").order("id", { ascending: false });
      setBooks(data || []);
    };

    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      const role = data?.user?.user_metadata?.role || data?.user?.app_metadata?.role;
      if (role === "admin") setIsAdmin(true);
    };

    loadBooks();
    checkAdmin();
  }, []);
    // حذف كتاب
    async function deleteBook(slug: string) {
      if (!confirm("هل أنت متأكد من حذف هذا الكتاب؟")) return;

      const { error } = await supabase.from("books").delete().eq("slug", slug);

      if (error) return alert("فشل الحذف");

      alert("تم الحذف ✔");
      setBooks((prev: Book[]) => prev.filter((b) => b.slug !== slug));
    }

  return (
    <div className="max-w-5xl mx-auto px-4 py-36 text-right">
      <h1 className="text-3xl font-bold text-[#6B3074] mb-10 text-center"> كتب 📚</h1>

      {isAdmin && (
        <div className="text-center mb-10">
          <Link
            href="/books/add"
            className="bg-[#C39E71] text-white px-6 py-3 rounded-lg"
          >
            ➕ إضافة كتاب جديد
          </Link>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 justify-center">
        {books.map((book) => (
          <div
            key={book.id}
            className="border border-[#C39E71] bg-white/60 rounded-2xl p-5 shadow hover:scale-[1.02] transition"
          >
            

            <h2 className="text-xl font-semibold text-[#6B3074]">{book.title}</h2>
            <p className="text-[#827382] mt-2">{book.text}</p>

            <p className="text-sm text-[#A19282] mt-2">{book.date}</p>

            <Link
              href={`/books/${book.slug}`}
              className="block mt-4 text-[#6B3074] font-semibold hover:underline"
            >
              قراءة المزيد →
            </Link>

            {/* زر الحذف والتعديل للأدمن */}
            {isAdmin && (
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => deleteBook(book.slug)}
                  className="text-red-600 hover:underline"
                >
                  حذف
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

