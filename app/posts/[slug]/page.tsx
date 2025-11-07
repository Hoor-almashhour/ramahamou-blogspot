import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import React from "react";
import Markdown from "react-markdown";
import { getPostBySlug } from "@/lib/posts";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "المقال غير موجود" };
  return { title: post.meta.title };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  return (
    <section className="bg-[#fdf8f6] min-h-screen py-24 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10 text-right leading-loose font-[Noto_Naskh_Arabic] text-[#333]">
        {/* عنوان المقال */}
        <h1 className="text-3xl font-bold text-[#6B3074] mb-6 text-center">{post.meta.title}</h1>

        {/* التاريخ */}
        <p className="text-lg text-[#C39E71] text-center mb-8">{post.meta.date}</p>

        {/* الصورة الرئيسية */}
        {post.meta.image && (
          <div className="flex justify-center mb-10">
            <Image
              src={post.meta.image}
              alt={post.meta.title}
              width={700}
              height={400}
              className="rounded-xl shadow-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>
        )}

        {/* المحتوى */}
        <div className="prose prose-lg prose-headings:text-[#6B3074] prose-strong:text-[#C39E71] prose-img:rounded-xl prose-img:mx-auto prose-img:my-6 max-w-none prose-p:mb-6 prose-p:leading-8 prose-p:text-[#333] prose-blockquote:border-r-4 prose-blockquote:border-[#C39E71] prose-blockquote:bg-[#faf5f3] prose-blockquote:pr-4 prose-blockquote:rounded-md prose-blockquote:text-[#555] prose-blockquote:italic" dir="rtl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </section>
  );
}
