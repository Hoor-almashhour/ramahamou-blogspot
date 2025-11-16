"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaInstagram, FaSearch, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Menu, X } from "lucide-react";
import { TiHome } from "react-icons/ti";
import { IoChevronDown } from "react-icons/io5";
import { supabase } from "@/lib/supabaseClient";

type Post={
  slug: string;
  title: string;
};

type SearchResult = {
  title: string;
  slug: string; // استخدم هذا للرابط
  excerpt?: string;
  content?: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openArticles, setOpenArticles] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);

  const links = [
    { href: "/", label: "الرئيسية", icon: <TiHome className="text-[#C39E71] hover:text-white" /> },
    { href: "/books", label: "كتب" },
    { href: "/view", label: "مشاهد" },
    { href: "/about", label: "عن رامة" },
    { href: "/contact", label: "تواصل معنا" },
  ];

  // جلب المقالات من Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("slug, title")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setPosts(data||[]);
    };
    fetchArticles();
  }, []);

  // البحث في المقالات
    const handleSearch = async (q: string) => {
    setQuery(q); // لتحديث النص المعروض في الـ input

    if (q.trim() === "") {
        setResults([]); // إذا كان البحث فارغ
        return;
    }

    try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data); // تحديث النتائج
    } catch (err) {
        console.error(err);
        setResults([]);
    }
    };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="hidden md:block w-full bg-[#dec6da] text-[#827382] text-sm py-3">
        <div className="mx-14 flex flex-row justify-start items-start gap-4">
          <div className="flex items-center flex-row-reverse gap-3">
            <span>للتواصل:</span>
            <Link href="https://wa.me/905347152280" className="flex items-center gap-1">
              <FaWhatsapp /> 00905347152280
            </Link>
            <span className="flex items-center gap-1">
              <MdEmail /> ramahamou.blogspot.com
            </span>
          </div>
          <div className="flex items-center flex-row-reverse gap-2">
            <Link href="https://www.instagram.com/rama.yh?utm_source=qr" className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition">
              <FaInstagram size={14} />
            </Link>
            <Link href="https://wa.me/905347152280" className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition">
              <FaWhatsapp size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
    <nav className="fixed w-full bg-[#FFFFFF]  md:mt-12 ">
        <div className="md:mx-11 flex flex-row-reverse justify-between items-center p-4">
          {/* Logo */}
          <img  src= "/logo/logo.png"
           alt="logo" width={170} height={100} className="object-cover w-40 h-28"/>

          {/* Desktop Links */}
          <ul className="hidden md:flex flex-row-reverse gap-8 text-[#C39E71] font-medium relative">
            {links.slice(0, 2).map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`flex items-center flex-row-reverse gap-1 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    pathname === link.href ? "bg-[#6B3074] text-white" : "hover:bg-[#6B3074]/10 hover:text-[#6B3074]"
                  }`}
                >
                  {link.label}
                  {link.icon}
                </Link>
              </li>
            ))}

            {/* Dropdown المقالات */}
            <li className="relative group">
              <button className="flex items-center flex-row-reverse gap-1 px-4 py-2 rounded-lg hover:bg-[#6B3074] hover:text-white">
                <IoChevronDown /> مقالات
              </button>
              <ul className="absolute right-0 top-full mt-1 w-64 text-right text-sm bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {posts.map((post) => ( 
                  <li key={post.slug}> 
                    <Link
                      href={`/posts/${post.slug}`} 
                      className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                        pathname === `/posts/${post.slug}` ? "bg-[#6B3074] text-white font-semibold" : "text-[#C39E71] hover:bg-[#6B3074]/10 hover:text-[#6B3074]" 
                      }`}
                    >
                      {post.title} 
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/archive"
                    className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                      pathname === "/archive" ? "bg-[#6B3074] text-white font-semibold" : "text-[#C39E71] hover:bg-[#6B3074]/10 hover:text-[#6B3074]"
                    }`}
                  >
                    الأرشيف
                  </Link>
                </li>
              </ul>
            </li>

            {links.slice(2).map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    pathname === link.href ? "bg-[#6B3074] text-white" : "hover:bg-[#6B3074]/10 hover:text-[#6B3074]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search & User */}
          <div className="hidden md:flex items-center flex-row-reverse gap-4 relative">
            <button onClick={() => setShowSearch(!showSearch)} className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#6B3074] hover:text-white transition">
              <FaSearch />
            </button>
            {showSearch && (
              <div className="absolute right-0 top-10 w-64 bg-white rounded-lg shadow-lg border border-[#C39E71] p-2 text-right z-50">
                <input
                  type="text"
                  placeholder="بحث..."
                  value={query}
                   onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#C39E71] text-right text-[#6B3074] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C39E71] mb-2"
                />
                {query.trim() !== "" && results.length > 0 && (
                  <ul className="max-h-60 overflow-y-auto">
                   {results.map((post: SearchResult) => (
                    <li key={post.slug}>
                        <Link
                            href={`/posts/${post.slug}`}
                            onClick={() => {
                                setQuery("");
                                setShowSearch(false);
                            }}
                          className="block px-3 py-2 text-[#C39E71] hover:bg-[#6B3074]/10 hover:text-[#6B3074] rounded-md transition"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {query.trim() !== "" && results.length === 0 && <p className="px-3 py-2 text-gray-400">لا توجد نتائج</p>}
              </div>
            )}
            <Link href="/MyAccountPage" className="flex items-center space-x-1 text-[#C39E71] hover:text-[#6B3074] transition-colors">
              <span className="sm:inline">تسجيل الدخول</span>
              <FaUser size={16} />
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setOpen(!open)} className="text-2xl text-[#C39E71] hover:bg-[#6B3074] hover:text-white transition">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button onClick={() => setShowSearch(!showSearch)} className="text-2xl text-[#C39E71] hover:bg-[#6B3074] hover:text-white transition">
              <FaSearch size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden px-6 pb-3 relative">
            <input
              type="text"
              placeholder="بحث..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 border border-[#C39E71] rounded-lg text-right text-[#6B3074] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C39E71]"
            />
            {query.trim() !== "" && (
              <ul className="absolute w-full mt-2 max-h-60 overflow-y-auto bg-white border border-[#C39E71] rounded-lg shadow-lg z-50">
                {results.length > 0 ? (
                  results.map((post: SearchResult) => (
                   <li key={post.slug}>
                      <Link
                        href={`/posts/${post.slug}`}
                        onClick={() => {
                          setQuery("");
                          setShowSearch(false);
                          setOpen(false);
                        }}
                        className="block px-4 py-2 text-[#6B3074] hover:bg-[#6B3074]/10 hover:text-[#6B3074] rounded-md transition text-right"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-400 text-right">لا توجد نتائج</li>
                )}
              </ul>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Side Menu */}
      {open && (
        <div className="fixed top-0 right-0 w-full h-full bg-[#4A4A4A] text-white p-6 z-40 flex flex-col justify-between transition-transform duration-300">
          <div>
            <button onClick={() => setOpen(false)} className="text-white mb-6 self-end text-2xl">
              <X />
            </button>
            <h2 className="text-center mb-6 font-semibold text-lg">رامة حمو</h2>
            <ul className="space-y-3 flex flex-col items-start font-semibold text-lg pt-6">
              {links.slice(0, 2).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-[#6B3074] transition">
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* Dropdown المقالات */}
              <li className="mt-4 w-full flex flex-col items-start">
                <button
                  onClick={() => setOpenArticles(!openArticles)}
                  className="flex items-center flex-row-reverse gap-2 px-4 py-2 rounded-lg hover:bg-[#6B3074] hover:text-white transition"
                >
                  <IoChevronDown className={`transition-transform duration-300 ${openArticles ? "rotate-180" : ""}`} /> مقالات
                </button>
                {openArticles && (
                  <ul className="w-full mt-1 text-sm text-right bg-[#4A4A4A] text-white">
                    {posts.map((post) => ( 
                      <li key={post.slug}> 
                        <Link
                          href={`/posts/${post.slug}`} 
                          onClick={() => setOpen(false)}
                          className="block px-4 py-3 hover:bg-gray-100"
                        >
                          {post.title} 
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/archive" onClick={() => setOpen(false)} className="block px-4 py-3 hover:bg-gray-100">
                        الأرشيف
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {links.slice(2).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-[#6B3074] transition">
                    {link.label}
                  </Link>
                </li>
              ))}
              <Link href="/MyAccountPage" onClick={() => setOpen(false)} className="flex items-center space-x-1 px-3 text-white mt-3 hover:text-[#6B3074] transition-colors">
                <span className="sm:inline">تسجيل الدخول</span>
                <FaUser size={16} />
              </Link>
            </ul>
            {/* التواصل والسوشيال */}
            <div className="text-sm text-center  border-t border-gray-500 pt-4 mt-8">

                {/* البريد الإلكتروني */}
                <p className="mb-2 flex justify-center flex-row-reverse gap-2 items-center text-gray-200">
                    <MdEmail /> ramahamou.blogspot.com
                </p>

                {/* واتساب */}
                <Link
                    href="https://wa.me/905347152280"
                    dir="ltr"
                    className="mb-3 flex justify-center flex-row gap-2 items-center text-gray-200"
                >
                    <FaWhatsapp /> +905347152280
                </Link>

                {/* أيقونات السوشيال */}
                <div className="flex justify-center gap-2 text-gray-200">
                    <Link
                    href="https://wa.me/905347152280"
                    className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition"
                    >
                    <FaWhatsapp size={14} />
                    </Link>
                    <Link
                    href="https://www.instagram.com/rama.yh?utm_source=qr&igsh=MTA2a251d3dvZDNmdg=="
                    className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition"
                    >
                    <FaInstagram size={14} />
                    </Link>
                </div>

            </div>
          </div>
          

        </div>
      )}
    </>
  );
};

export default Navbar;
