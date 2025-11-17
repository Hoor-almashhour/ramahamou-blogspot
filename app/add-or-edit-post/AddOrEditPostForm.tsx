"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamicImport from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamicImport(() => import('@uiw/react-md-editor'), { ssr: false });

export default function AddOrEditPostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const isEditing = Boolean(slug);

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [publishDate, setPublishDate] = useState<string>( new Date().toISOString().split("T")[0] );

  // ⭐ التحقق من الأدمن
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || (user.user_metadata.role || user.app_metadata.role) !== "admin") {
        setIsAdmin(false);
        router.push("/");
        return;
      }
      setIsAdmin(true);
    };
    checkAdmin();
  }, [router]);

  // ⭐ جلب بيانات المقال إذا كان تعديل
  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        alert("❌ خطأ في جلب بيانات المقال");
        router.push("/");
        return;
      }

      setTitle(data.title);
      setExcerpt(data.excerpt);
      setContent(data.content);
      setCategory(data.category || "");
       setTags(Array.isArray(data.tags) ? data.tags : []);
      setExistingImage(data.image_url || null);
     setPublishDate(data.created_at?.split("T")[0] || "");
    };

    fetchPost();
  }, [slug, router]);

  const generateSlug = (txt: string) => {
    if (!txt.trim()) return crypto.randomUUID();
    return txt.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const uploadImage = async () => {
    if (!imageFile) return existingImage; // إذا لم يتم اختيار صورة جديدة → نستخدم الصورة القديمة
    const ext = imageFile.name.split(".").pop();
    const fileName = `post_${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("post-images").upload(fileName, imageFile);
    if (error) {
      alert("❌ خطأ في رفع الصورة: " + error.message);
      return null;
    }
    const { data } = supabase.storage.from("post-images").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return alert("❌ الرجاء اختيار تصنيف");

    setLoading(true);

   
     const cleanTags = tags.map(t => t.trim()).filter(Boolean);
    const image_url = await uploadImage();

    if (isEditing) {
      const { error } = await supabase.from("posts")
        .update({ title, excerpt, content, category,  tags: cleanTags,
           image_url, created_at: publishDate})
        .eq("slug", slug);

      setLoading(false);
      if (error) alert("❌ خطأ: " + error.message);
      else {
        alert("✔ تم تحديث المقال بنجاح");
        router.push("/");
      }
    } else {
      const newSlug = generateSlug(title) || crypto.randomUUID();
      const { error } = await supabase.from("posts")
        .insert([{ title, slug: newSlug, excerpt, content, category,  tags: cleanTags,
           image_url, created_at: new Date() }]);
      setLoading(false);
      if (error) alert("❌ خطأ: " + error.message);
      else {
        alert("✔ تم إضافة المقال بنجاح");
        router.push("/");
      }
    }
  };

  if (isAdmin === null) return null;
  if (!isAdmin) return null;

  return (
    <section className="max-w-3xl mx-auto px-6 py-36">
      <h1 className="text-3xl font-bold mb-8 text-center text-ramaPurple">
        {isEditing ? "تعديل المقال" : "إضافة مقالة جديدة"} ✍️
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* عنوان */}
        <div>
          <label className="font-semibold">عنوان المقال</label>
          <input
            className="w-full px-4 py-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        {/* 2️⃣ التاريخ */}
         <div>
           <label className="block font-semibold mb-1">تاريخ النشر</label>
            <input type="date" className="w-full px-4 py-2 border rounded-lg"
             value={publishDate} onChange={(e) => setPublishDate(e.target.value)}
              /> 
           </div> 

        {/* Excerpt */}
        <div>
          <label className="font-semibold">الوصف المختصر (Excerpt)</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>

        {/* تصنيف */}
        <div>
          <label className="font-semibold">التصنيف</label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">اختر تصنيفًا</option>
            <option value="أعمال">أعمال</option>
            <option value="كتب">كتب</option>
            <option value="تعليم">تعليم</option>
            <option value="أدب">أدب</option>
            <option value="مشاهد">مشاهد</option>
          </select>
        </div>

        {/* الوسوم */}
        <div>
          <label className="font-semibold">الوسوم Tags</label>
          <div className="flex gap-2">
            <input
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="أدخل وسم ثم اضغط إضافة"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (!tagInput.trim()) return;
                setTags([...tags, tagInput.trim()]);
                setTagInput("");
              }}
              className="bg-ramaGold px-4 py-2 rounded-lg text-white"
            >
              إضافة
            </button>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {tags.map((t, i) => (
              <span key={i} className="bg-ramaBeige px-3 py-1 rounded-full border">#{t}</span>
            ))}
          </div>
        </div>

        {/* الصورة */}
        <div>
          <label className="font-semibold">صورة المقال</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImageFile(file);
              if (file) setImagePreview(file ? URL.createObjectURL(file) : null);
            }}
          />
          {imagePreview && imagePreview !== "" && (
            <img src={imagePreview} className="w-full h-64 object-cover rounded-lg border mt-2"/>
            )}

            {!imagePreview && existingImage && existingImage !== "" && (
            <img src={existingImage} className="w-full h-64 object-cover rounded-lg border mt-2"/>
            )}

        </div>

        {/* محرّر المحتوى */}
        <div>
          <label className="font-semibold block mb-2">المحتوى الكامل</label>
          <MDEditor value={content} onChange={(val) => setContent(val || "")} height={400} />
        </div>

        {/* زر الإرسال */}
        <button
          type="submit"
          className="bg-[#C39E71] text-white px-6 py-3 rounded-lg w-full mt-6"
        >
          {loading ? "جاري الحفظ..." : (isEditing ? "تحديث المقال" : "إضافة المقال")}
        </button>
      </form>
    </section>
  );
}