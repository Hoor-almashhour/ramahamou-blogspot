"use client";

import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("تم إرسال رسالتك بنجاح!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f8f3ee] to-white flex flex-col items-center py-36 px-8">
      <h2 className="text-4xl font-bold text-[#652A7A] mb-16 flex items-center flex-row-reverse gap-2 mt-10">
        <span ><IoMdMail className="text-[#C8485F]" /></span> تواصل معنا
      </h2>

      <div className="flex flex-col-reverse md:flex md:flex-row items-center justify-between gap-16 max-w-5xl w-full">
            {/* النموذج */}
            <form
                onSubmit={handleSubmit}
                className= "w-full md:max-w-5xl bg-[#f4f2f1] p-6 rounded-xl shadow-sm flex flex-col gap-4 "
                >
                <h3 className="text-2xl font-semibold text-[#652A7A] mb-2 text-right">
                    تواصل معنا
                </h3>

                <div className="flex flex-col  md:flex-row gap-4">
                    <input
                    type="text"
                    name="name"
                    placeholder="اسمك"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full md:w-1/2 bg-[#eae8e6] p-3 rounded-md text-right placeholder:text-gray-500 focus:outline-none"
                    />
                    <input
                    type="email"
                    name="email"
                    placeholder="بريدك الإلكتروني"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full md:w-1/2 bg-[#eae8e6] p-3 rounded-md text-right placeholder:text-gray-500 focus:outline-none"
                    />
                </div>

                <textarea
                    name="message"
                    placeholder="رسالتك"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full bg-[#eae8e6] p-3 rounded-md text-right placeholder:text-gray-500 focus:outline-none"
                />

                <button
                    type="submit"
                    className="bg-transparent border-2 border-[#652A7A] cursor-pointer text-[#652A7A] px-6 py-2 rounded-md font-medium hover:bg-[#652A7A] hover:text-white transition"
                >
                    أرسل
                </button>
            </form>

            {/* المعلومات */}
            <div className="w-full md:max-w-5xl flex flex-col justify-center text-right leading-relaxed">
                <p className="text-[#5b3b6b] mb-4">
                    أهلاً بك، يسعدنا تواصلك معنا وإرسال اقتراحاتك أو استفساراتك 
                </p>
                <p className="  text-[#7a5d4d] mb-6">
                    
                   
                 في حال رغبتك بطلب استشارة متخصصة يمكنك 
                 التواصل مباشرة عبر الرابط التالي

                </p>

                <div className=" font-bold flex items-center justify-start gap-4">
                   <Link href="https://www.instagram.com/rama.yh?utm_source=qr&igsh=MTA2a251d3dvZDNmdg==" className="text-[#7a5d4d] hover:text-[#5b3b6b] transition">
                    <FaInstagram size={25} />
                </Link>
                <Link href="https://wa.me/905347152280" className="text-[#7a5d4d] hover:text-[#5b3b6b] transition">
                    <FaWhatsapp size={25} />
                </Link>
                </div>
           </div>
        </div>
    </section>
  );
}
