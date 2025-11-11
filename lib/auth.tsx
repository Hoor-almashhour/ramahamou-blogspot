

import { User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";


export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const listenToAuth = (callback: (user: User | null) => void) => {
  supabase.auth.getSession().then(({ data }) => callback(data.session?.user ?? null));

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => listener.subscription.unsubscribe();
};