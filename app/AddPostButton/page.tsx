"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaPlus } from "react-icons/fa";

export default function AddPostButton() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsAdmin(false);
        return;
      }

      console.log("USER_METADATA:", user.user_metadata);
      console.log("APP_METADATA:", user.app_metadata);

      // اجمع الدور من كلا المكانين
      const role =
        user.user_metadata?.role?.toLowerCase?.() ||
        user.app_metadata?.role?.toLowerCase?.();

      console.log("USER ROLE:", role);

      setIsAdmin(role === "admin");
    };

    checkUser();
  }, []);

  if (isAdmin === null) return null;
  if (!isAdmin) return null;

  return (
    <button
      onClick={() => router.push("/add-post")}
      className="bg-[#C39E71] flex gap-1.5 items-center justify-center text-white px-4 py-2 rounded-full hover:bg-[#c1935a] transition"
    >
      إضافة مقال <FaPlus />
    </button>
  );
}
