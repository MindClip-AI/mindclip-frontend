import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') || '/workspace'

  if (!code) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.redirect(new URL(next.startsWith('/') ? next : '/workspace', req.url))
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
