"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";


interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  image?: string; 
}

interface Post {
  slug: string;
  meta: PostMeta;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) return console.log(error);
      const user = data.user;
      if (!user) return;

      const role = user.user_metadata?.role || user.app_metadata?.role || null;
      if (role === "admin") setIsAdmin(true);
    };
    checkAdmin();
  }, []);
      const deletePost = async (slug: string) => {
      if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) return;

      const { error } = await supabase.from("posts").delete().eq("slug", slug);

      if (error) alert("❌ خطأ: " + error.message);
      else {
        alert("✔ تم حذف المقال بنجاح!");
        setPosts(prev => prev.filter(post => post.slug !== slug)); // تحديث الكروت مباشرة
      }
  };

  
  return (
     <div className="relative w-72 bg-[#FAF6F1] border border-[#E4D8C5] rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link href={`/posts/${post.slug}`} className="block">
        {post.meta.image && (
          <div className="relative w-full h-56">
            <img
              src={post.meta.image}
              alt={post.meta.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="p-5 text-right">
          <h3 className="text-xl font-semibold text-[#6B3074] mb-1">
            {post.meta.title}
          </h3>
          <p className="text-sm text-[#9E8E7A] mb-2">{post.meta.date}</p>
          <p className="text-gray-700 line-clamp-4">{post.meta.excerpt}</p>
        </div>
      </Link>
      {isAdmin && (
         <div className=" flex gap-1 justify-between ">
            <button
            onClick={() => deletePost(post.slug)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition z-10"
            >
              حذف
            </button>
            <Link href={`/add-or-edit-post?slug=${post.slug}`}
            className="bg-blue-500 text-white px-2 py-1 rounded  absolute top-2 left-2
             hover:bg-blue-600"
            >تعديل</Link>
          </div>
      )}
    </div>
  );
}
