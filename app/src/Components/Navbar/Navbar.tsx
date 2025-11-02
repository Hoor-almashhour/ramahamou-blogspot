"use client";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube, FaTelegramPlane, FaTiktok, FaSearch } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { IoChevronDown } from "react-icons/io5";
import { usePathname } from "next/navigation";

 const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");


    const links = [
    { href: "/", label: "الرئيسية", icon: <TiHome  className="text-[#C39E71]" /> },
    { href: "1", label: "معرض الصور" },
    { href: "2", label: " عن راما" },
    { href: "3", label: "تواصل معنا" },
  ];


  return (
    <>
      {/* Top Contact Bar */}
       <div className="hidden md:block w-full bg-[#dec6da] text-[#827382] text-sm py-3">
          <div className=" mx-14 flex flex-row-reverse justify-start  items-start gap-4">
        
                {/* Left side - Contact info */}
                <div className="flex items-center flex-row-reverse gap-3">
                <span className="flex items-center gap-1">
                    
                    :للتواصل
                </span>
                <span className="flex items-center justify-center flex-row-reverse gap-1">
                    <FaWhatsapp className="text-[#827382]" />
                    00971505292454
                </span>
                <span className="flex items-center justify-center flex-row-reverse gap-1">
                    <MdEmail className="text-[#827382]" />
                    ramahamou.blogspot.com
                </span>
                </div>

                {/* Right side - Social icons */}
                <div className="flex items-center flex-row-reverse text-[#827382]">
                <Link href="#" className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition">
                    <FaFacebookF size={14} />
                </Link>
                <Link href="#" className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition">
                    <FaInstagram size={14} />
                </Link>
                <Link href="#" className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition">
                    <FaYoutube size={14} />
                </Link>
                <Link href="#" className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition">
                    <FaTelegramPlane size={14} />
                </Link>
                <Link href="#" className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition">
                    <FaWhatsapp size={14} />
                </Link>
                <Link href="#" className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition">
                    <FaTiktok size={14} />
                </Link>
                </div>
         </div>
      </div>

      {/* Main Navbar */}
        <nav className="fixed w-full  bg-[#FFFFFF] backdrop-blur-md ">
        <div className=" md:mx-11 flex flex-row-reverse justify-between items-center p-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-serif text-[#C39E71]">
            راما حمو
            </Link>
            <ul className="hidden  md:flex flex-row-reverse  gap-8 text-[#C39E71] font-medium relative">
                    {links.slice(0, 2).map((link) => ( 
                    <li key={link.label}>
                        <Link
                        href={link.href}
                        className={`flex items-center gap-1  px-4 py-2 rounded-lg hover:bg-[#6B3074] hover:text-white ${
                            pathname === link.href ? "text-[#C39E71]" : ""
                        }`}
                        >
                        {link.label}
                        {link.icon}
                        </Link>
                    </li>
                ))}
                    {/*القائمة المنسدلة للمقالات */}
                    <li className="relative group">
                        <button className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-[#6B3074] hover:text-white">
                            <IoChevronDown />  المقالات
                        </button>
                    <ul className="absolute right-0 top-full mt-1 w-52 text-right bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        {[
                        { href: "#", label: "!غيرتني الإبادة" },
                        { href: "+", label: "محاكاة في حلبة المصارعة - القسم الأول" },
                        { href: "-", label: "محاكاة في حلبة المصارعة - القسم الثاني" },
                        ].map((blogs) => (
                        <li key={blogs.href}>
                            <Link
                            href={blogs.href}
                            className={`block px-4 py-4 rounded-md transition-all duration-200
                                ${
                                pathname === blogs.href
                                    ? "text-[#C39E71] font-semibold"
                                    : "text-[#C39E71] hover:bg-gray-200 hover:text-[#6B3074]"
                                }`}
                            >
                            {blogs.label}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </li>
                    {links.slice(2).map((link) => (
                    <li key={link.label}>
                        <Link
                        href={link.href}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-[#6B3074] hover:text-white ${
                            pathname === link.href ? "text-[#C39E71]" : ""
                        }`}
                        >
                        {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
              
                {/* 🔍 Search Button */}
                <div className="hidden md:flex items-center relative">
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#6B3074] hover:text-white transition"
                    >
                        <FaSearch />
                    </button>

                    {showSearch && (
                        <input
                        type="text"
                        placeholder="...بحث"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="absolute left-0 top-10 w-52 px-3 py-2 rounded-lg border border-[#C39E71] text-right text-[#6B3074] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C39E71] transition-all duration-300"
                        />
                        
                        
                    )}
                </div>

               {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center justify-center text-2xl  text-[#C39E71] hover:bg-[#6B3074] hover:text-white transition"
                        >
                        {open ? <X size={22} /> : <Menu size={22} />}
                   </button>
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="flex items-center justify-center  text-2xl text-[#C39E71] hover:bg-[#6B3074] hover:text-white transition"
                        >
                        <FaSearch size={16} />
                    </button>
                   
                </div>
                
           </div>
            {/* مربع البحث في الموبايل */}
                {showSearch && (
                <div className="md:hidden px-6 pb-3">
                    <input
                    type="text"
                    placeholder="...بحث"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-[#C39E71] rounded-lg text-right text-[#6B3074] focus:outline-none focus:ring-2 focus:ring-[#C39E71]"
                    />
                </div>
             )}
        </nav>
         {/* القائمة الجانبية في الموبايل */}
        {open && (
        <div className="fixed top-0 right-0 w-full h-full bg-[#4A4A4A] text-white p-6 z-40 flex flex-col justify-between transition-transform duration-300">
          <div>
                <button
                onClick={() => setOpen(false)}
                className="text-white mb-6 self-end text-2xl"
                >
                <X />
                </button>

                <h2 className="text-center mb-6 font-semibold text-lg">
                راما حمو
                </h2>

            <ul className="space-y-3 flex flex-col items-end font-semibold text-lg ">
               {links.slice(0, 2).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 rounded-md hover:bg-[#6B3074] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
               <li className="mt-2 w-full flex flex-col items-end "
                >
                    <button className="flex items-center justify-center text-right  gap-1 px-4 py-2 rounded-lg hover:bg-[#6B3074] hover:text-white">
                        <IoChevronDown />  المقالات
                        
                    </button>
                    <ul className="absolute right-0 top-full mt-1 w- text-right bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        {[
                        { href: "#", label: "!غيرتني الإبادة" },
                        { href: "+", label: "محاكاة في حلبة المصارعة - القسم الأول" },
                        { href: "-", label: "محاكاة في حلبة المصارعة - القسم الثاني" },
                        ].map((blogs) => (
                        <li key={blogs.href}>
                            <Link
                            href={blogs.href}
                            className={`block px-4 py-4 rounded-md transition-all duration-200
                                ${
                                pathname === blogs.href
                                    ? "text-[#C39E71] font-semibold"
                                    : "text-[#C39E71] hover:bg-gray-200 hover:text-[#6B3074]"
                                }`}
                            >
                            {blogs.label}
                            </Link>
                        </li>
                        ))}
                    </ul>
                </li>
                {links.slice(2).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="px-4 py-4 flex justify-between items-center w-full text-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            </ul>
            {/* التواصل والسوشيال */}
            <div className="text-sm text-center mt-6 border-t border-gray-500 pt-4">
                <p className="mb-2 flex justify-center gap-2 items-center text-gray-200">
                <MdEmail />  ramahamou.blogspot.com
                </p>
                <p className="mb-3 flex justify-center gap-2 items-center text-gray-200">
                <FaWhatsapp /> +970568402208
                </p>

                <div className="flex justify-center gap-2 text-gray-200">
                {[FaTiktok, FaWhatsapp, FaTelegramPlane, FaYoutube, FaInstagram, FaFacebookF].map(
                    (Icon, i) => (
                    <Link
                        key={i}
                        href="#"
                        className="p-1 border border-gray-500 rounded-md hover:bg-[#6B3074] hover:text-white transition"
                    >
                        <Icon size={14} />
                    </Link>
                    )
                )}
                </div>
          </div>
          </div>

          
        </div>
      )}
    </>
  );
};
export default Navbar;
