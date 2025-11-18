"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-28 px-4 md:px-16">

        {/* Logo */}
        <div>
            <Image
                src="/logo/logo.png"
                alt="logo"
                width={240}
                height={140}
                className="object-cover text-3xl"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
            />
        </div>
        
         {/* شعار الموقع */}
        <div className="flex flex-col items-center mb-6">
            <Image
            src="/Images/image.png" // ضع مسار شعارك هنا
            alt="rama"
            width={500}
            height={400}
            className="object-contain"
            unoptimized
            />
        </div>

      {/* فقرة المقدمة */}
      <div className="max-w-4xl leading-relaxed space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#6B3074]">
             ركن في الصالون 
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-[#A55B5B]">
            أنا رامة حمو، منحني الله مخيلة تنسج الحكايات، وعقلاً يدرس الهندسة الطبية والحيوية، وروحاً تضج بالعاطفة وتتأرجح بين الأمل والحذر، 
          <br />
        </h2>

        <p className="text-lg md:text-xl text-[#6B3074] font-semibold">
          في هذا الركن الهادئ من ’’ الصالون ’’ أشارك أفكاراً ومشاهد تتشكل في داخلي..
           
          <br />
          كما لو أننا نجلس معاً.. ونترك العنان لكلماتنا أن تدلي بما لدينا..
          <br />
          
        </p>
      </div>
    </section>
  );
};

export default Hero;
