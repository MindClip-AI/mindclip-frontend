import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    // Attempt to exchange the OAuth code for a session
    // supabase-js exposes exchangeCodeForSession on the server auth helper
    // If successful, the helper will set the auth cookies via the provided cookie store
    // @ts-ignore
    const { data, error } = await supabase.auth.exchangeCodeForSession(req.url)

    if (error) {
      const redirectUrl = new URL('/login', req.url)
      redirectUrl.searchParams.set('error', error.message)
      return NextResponse.redirect(redirectUrl)
    }

    // On success, redirect to workspace
    return NextResponse.redirect(new URL('/workspace', req.url))
  } catch (err) {
    const redirectUrl = new URL('/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }
}
