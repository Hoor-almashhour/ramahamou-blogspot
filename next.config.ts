/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    customKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
}

module.exports = nextConfig