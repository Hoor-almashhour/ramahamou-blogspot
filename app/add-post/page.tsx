'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AddPostPage() {
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

   

    /** رفع الصورة */
    const uploadImage = async () => {
        if (!imageFile) return null;

        const fileName = `post_${Date.now()}.${imageFile.name.split('.').pop()}`;

        const { data, error } = await supabase.storage
        .from('post-images')
        .upload(fileName, imageFile);

        if (error) {
        alert('❌ خطأ في رفع الصورة: ' + error.message);
        return null;
        }

        const { data: urlData } = supabase.storage
        .from('post-images')
        .getPublicUrl(fileName);

        return urlData.publicUrl;
    };

    /** إرسال المقال */
    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const uploadedImage = await uploadImage();

        const { error } = await supabase.from('posts').insert([
        {
            title,
            slug,
            description,
            image: uploadedImage,
            content,
            created_at: new Date(),
        },
        ]);

        setLoading(false);

        if (error) {
        alert('❌ حدث خطأ: ' + error.message);
        } else {
        alert('✔ تمت إضافة المقال بنجاح!');
        router.push('/');
        }
    };

    

  return (
    <section className="max-w-2xl mx-auto mt-10 p-36 bg-white shadow rounded-xl min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center"> إضافة مقالة جديدة ➕ </h1>

        <form onSubmit={submitPost} className="space-y-4">

            <div>
                <label className="block font-semibold mb-1">عنوان المقال</label>
                <input
                className="w-full px-4 py-2 border rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </div>

            {/* 1️⃣ رفع الصورة أولاً */}
            <div>
                <label className="block font-semibold mb-1">صورة المقال</label>
                <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setImageFile(file);
                    if (file) setImagePreview(URL.createObjectURL(file));
                }}
                />
            </div>

            {imagePreview && (
                <img
                src={imagePreview}
                className="w-full h-64 object-cover rounded-lg border"
                />
            )}

            {/* 2️⃣ التاريخ */}
            <div>
                <label className="block font-semibold mb-1">تاريخ النشر</label>
                <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg"
                value={new Date().toISOString().split("T")[0]} // القيمة الافتراضية اليوم
                onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    // يمكنك تخزين التاريخ في created_at أو أي حالة أخرى إذا أردت
                }}
                />
            </div>

            {/* 3️⃣ المحتوى الكامل */}
            <div>
                <label className="block font-semibold mb-1">المحتوى الكامل</label>
                <textarea
                    className="w-full px-4 py-2 border rounded-lg"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>

            
            <button
                type="submit"
                className="bg-[#C39E71] text-white px-6 py-2 cursor-pointer rounded-lg hover:bg-[#c39358] w-full"
            >
                {loading ? 'جارٍ إضافة المقال...' : 'إضافة المقال'}
            </button>

        </form>

    </section>
  );
}
