"use client"; 
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function AddPostButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/add-post")}
      className=" bg-[#C39E71] flex gap-1.5 items-center justify-center  text-white  px-6 py-2 rounded-full hover:bg-[#c1935a]  transition"
    >
      إضافة مقال <FaPlus /> 
    </button>
  );
}
