import { User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

// 🔑 تسجيل الدخول
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data.user;
};

// 🚪 تسجيل الخروج
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

// 👂 مراقبة تغيّر حالة تسجيل الدخول
export const listenToAuth = (callback: (user: User | null) => void) => {
  // عند التحميل لأول مرة
  supabase.auth.getSession().then(({ data }) => {
    callback(data.session?.user ?? null);
  });

  // عند تغيّر الحالة (login/logout)
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
};
