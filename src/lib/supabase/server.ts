import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Returns a Supabase server client bound to the current request's cookies
export function createServerSupabaseClient() {
  const cookieStore = cookies()
  return createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookies: cookieStore,
  })
}
