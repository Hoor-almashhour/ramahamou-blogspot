import { User } from "@supabase/supabase-js";
import { getSupabaseClient } from "./supabaseClient";

// ✅ تسجيل الدخول
export const login = async (email: string, password: string) => {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data.user;
};

// 🚪 تسجيل الخروج
export const logout = async () => {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

// 👂 مراقبة تغيّر حالة تسجيل الدخول
export const listenToAuth = (callback: (user: User | null) => void) => {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn("Supabase client not initialized – skipping auth listener");
    return () => {};
  }

  // عند التحميل لأول مرة
  supabase.auth.getSession().then(({ data }) => {
    callback(data.session?.user ?? null);
  });

  // عند تغيّر الحالة (login/logout)
  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => listener.subscription.unsubscribe();
};
