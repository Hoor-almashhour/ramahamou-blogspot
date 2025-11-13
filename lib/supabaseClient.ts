'use client';

import { createClient } from '@supabase/supabase-js';

// نحمي الكود من التنفيذ أثناء build time على السيرفر
export function getSupabaseClient() {
  if (typeof window === 'undefined') {
    // لا نُرجع أي شيء أثناء البناء (على Vercel)
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase environment variables');
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
