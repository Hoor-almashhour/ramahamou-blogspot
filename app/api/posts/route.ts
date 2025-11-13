import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  const body = await req.json();
  const token = req.headers.get('Authorization');

  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
  }

  const { data, error } = await supabase.from('posts').insert([body]);
  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ data });
}
