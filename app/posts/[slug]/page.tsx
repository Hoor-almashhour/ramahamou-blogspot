import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/lib/posts";
import { FaWhatsapp } from "react-icons/fa";
type PostPageParams = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Promise<PostPageParams> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return { title: "المقال غير موجود" };
  return { title: post.meta.title };
}

export default async function PostPage({ params }: { params: Promise<PostPageParams> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return notFound();

  

  return (
    <section className="bg-[#fdf8f6] min-h-screen py-36 px-4  mt-2.5" >
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10 text-right">
        <h1 className="text-3xl font-bold text-[#6B3074] mb-4 text-center">
          {post.meta.title}
        </h1>
        <p className="text-lg text-[#C39E71] text-center mb-6">
          {post.meta.date}
        </p>
        {post.meta.image && (
          <div className="flex justify-center mb-8">
            <Image
              src={post.meta.image}
              alt={post.meta.title}
              width={700}
              height={400}
              className="rounded-xl shadow-sm object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="prose prose-lg max-w-none" dir="rtl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </section>
  );
}
