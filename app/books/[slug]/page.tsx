"use server";

import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

type BookPageParams = {
  slug: string;
};
export default async function BookPage(props: { params: Promise<BookPageParams> }) {
  const { slug } = await props.params;

  const decodedSlug = decodeURIComponent(slug);

  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("slug", decodedSlug)
    .maybeSingle();

 

  if (error || !book) return notFound();

  const whatsappLink = `https://wa.me/905347152280?text=أريد شراء كتاب: ${encodeURIComponent(
    book.title
  )}`;

  return (
    <section className="bg-[#fdf8f6] min-h-screen py-42 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-10 text-right">

        <h1 className="text-3xl font-bold text-[#6B3074] text-center">
          {book.title}
        </h1>
        <p className="text-[#C39E71] text-center mb-6">{book.date}</p>

        <p className="text-lg leading-loose text-gray-700">{book.text}</p>

        <div className="text-center mt-10">
          <a
            href={whatsappLink}
            target="_blank"
            className="bg-green-600 text-white px-6 py-3 rounded-lg inline-flex gap-2 items-center"
          >
            شراء الكتاب عبر واتساب <FaWhatsapp />
          </a>
        </div>
      </article>
    </section>
  );
}
