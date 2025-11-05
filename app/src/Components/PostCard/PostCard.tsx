import Image from "next/image";
import Link from "next/link";

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
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block overflow-hidden rounded-xl w-72 bg-[#FAF6F1] shadow hover:shadow-lg transition-all duration-300 border border-[#E4D8C5]"
    >
      {/* صورة المقال */}
      {post.meta.image && (
        <div className="relative w-full h-56">
          <Image
            src={post.meta.image}
            alt={post.meta.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
          />
        </div>
      )}

      {/* محتوى المقال */}
      <div className="p-5 text-right">
        <h3 className="text-xl font-semibold text-[#6B3074] mb-1">
          {post.meta.title}
        </h3>
        <p className="text-sm text-[#9E8E7A] mb-2">{post.meta.date}</p>
        <p className="text-gray-700 line-clamp-4">{post.meta.excerpt}</p>
      </div>
    </Link>
  );
}
