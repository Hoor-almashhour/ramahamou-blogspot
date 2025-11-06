import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import React from "react";
import Markdown from "react-markdown";
import { getPostBySlug } from "@/lib/posts";

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
    <article className="max-w-7xl mx-auto py-24 px-4 text-right">
      <h1 className="text-3xl font-bold text-ramaPurple mb-4">{post.meta.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{post.meta.date}</p>
      <div className="flex flex-col w-80 justify-center items-center">
             <Image 
                src={post.meta.image}
                alt={post.meta.title} 
                width={400}
                height={300}
                className=" mb-3"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
            />
      </div>
     
      <div className="prose prose-lg rtl text-gray-800 leading-relaxed">
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
  );
}
