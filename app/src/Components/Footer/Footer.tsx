"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaInstagram,  } from "react-icons/fa";

export default function Footer() {
        const [posts, setPosts] = useState<{ title: string; date: string; href: string }[]>([]);
        const [selectedMonth, setSelectedMonth] = useState("");
        const [filteredPosts, setFilteredPosts] = useState<
            { title: string; date: string; href: string }[]
        >([]);

        useEffect(() => {
            const fetchPosts = async () => {
            const res = await fetch("api/archive");
            const data = await res.json();
            setPosts(data);
            };
            fetchPosts();
        }, []);

        const months = [
            "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
            "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];
        const handleMonthSelect = (monthIndex: number) => {
           setSelectedMonth(months[monthIndex]);
            const filtered = posts.filter((post) => {
            const date = new Date(post.date);
            return date.getMonth() === monthIndex;
            });
            setFilteredPosts(filtered);
        };


  return (
    <footer className="bg-[#4B4B4B] text-white text-right ">
      {/* القسم العلوي - روابط وتفاصيل */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* العمود 1 - آخر المقالات أو نبذة */}
        <div>
          <h3 className="text-[#C39E71] text-xl font-bold mb-4">آخر المقالات</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/posts/genocide" className="hover:underline">غيرتني الإبادة</Link></li>
            <li><Link href="/posts/muhakama-fi-halbat-al-musar'a1" className="hover:underline">محاكاة في حلبة المصارعة (القسم الأول)</Link></li>
            <li><Link href="/posts/muhakama-fi-halbat-al-musar'a" className="hover:underline">محاكاة في حلبة المصارعة (القسم الثاني)</Link></li>
          </ul>
        </div>

        {/* العمود 2 - الأرشيف */}
          <div>
          <h3 className="text-[#C39E71] text-xl font-bold mb-4">الأرشيف</h3>
          <select
            dir="rtl"
            onChange={(e) => handleMonthSelect(parseInt(e.target.value))}
            className="w-full cursor-pointer text-gray-800 border-2 bg-white border-white rounded-md px-2 py-1 focus:outline-[#C39E71]"
          >
            <option value="">اختر شهر</option>
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month} 2025
              </option>
            ))}
          </select>

          {/* عرض المقالات */}
          {filteredPosts.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm bg-white/10 rounded-md p-3">
              {filteredPosts.map((post) => (
                <li key={post.href}>
                  <Link
                    href={post.href}
                    className="text-[#dec6da] hover:text-[#C39E71] transition"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
     

        {/* العمود 3 - روابط سريعة */}
        <div className="flex flex-col gap-2 text-sm font-medium">
          <h3 className="text-[#C39E71] text-xl font-bold mb-4">روابط سريعة</h3>
          <Link href="/posts" className="hover:underline">📚 المقالات</Link>
          <Link href="/archive" className="hover:underline">🗂️ الأرشيف</Link>
          <Link href="/contact" className="hover:underline">✉️ تواصل معنا</Link>
        </div>
      </div>

      {/* القسم السفلي */}
      <div className="bg-[#dec6da] text-[#4B4B4B] py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 px-6 text-sm">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} | موقع{" "}
            <span className="text-[#C39E71] font-semibold">رامة حمو</span> 
            
          </p>

          <div className="flex gap-3 text-[#4B4B4B]">
              <Link
                    href="https://www.instagram.com/rama.yh?utm_source=qr&igsh=MTA2a251d3dvZDNmdg=="
                    className="p-2 border border-gray-400 rounded-md hover:bg-[#C39E71] hover:text-white transition"
                >
                  <FaInstagram size={14} />
              </Link>
               <Link
                    href="https://wa.me/905347152280"
                    className="p-2 border border-gray-400 rounded-md hover:bg-[#C39E71] hover:text-white transition"
                >
                   <FaWhatsapp size={14} />
              </Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
