'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { login, logout, listenToAuth } from '@/lib/auth';
import { User } from '@supabase/supabase-js';


const LoginSection = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
    rememberMe: false
  });
    const [user, setUser] = useState<User | null>(null);

 
  useEffect(() => {
   const unsubscribe = listenToAuth((currentUser: User | null) => {
     setUser(currentUser);
   });
   return () => unsubscribe();
 }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.usernameOrEmail, formData.password);
      alert('✅ تم تسجيل دخول الأدمن بنجاح');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('❌ اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  // ✅ تسجيل الخروج
  const handleLogout = async () => {
    await logout();
    alert('👋 تم تسجيل الخروج بنجاح');
    window.location.href = '/';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#C39E71]">
        {user ? 'Welcome Admin' : 'تسجيل الدخول'}
      </h2>

      {/* 🔐 إذا لم يكن المستخدم مسجل دخول */}
      {!user ? (
        <form   onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700 mb-1">
              * عنوان البريد الإلكتروني *
            </label>
            <input
              type="email"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C39E71]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
             * كلمة المرور  *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C39E71]"
            />
          </div>

          <div  className="flex items-center justify-between mb-4">
            <div className="flex items-center flex-row-reverse ">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-[#C39E71] border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                تذكرني
              </label>
            </div>
            <Link href="#" className="text-sm text-gray-700 hover:text-[#C39E71]">
              هل نسيت كلمة مرورك ؟
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#C39E71] cursor-pointer text-white py-2 px-4 rounded-md hover:bg-[#bc8b50] transition"
          >
            تسجيل الدخول
          </button>
        </form>
      ) : (
        <button
          onClick={handleLogout}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
        >
          تسجيل الخروج ({user.email})
        </button>
      )}

    </div>
  );
};

export default LoginSection