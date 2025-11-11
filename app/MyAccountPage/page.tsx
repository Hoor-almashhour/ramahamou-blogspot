"use client";
import LoginSection from "../src/Components/LoginSection/LoginSection";

export default function MyAccountPage() {
  return (
    <div className=" bg-gray-100 py-40 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#6B3074]">حسابي </h1>
      <LoginSection />
    </div>
    );
}