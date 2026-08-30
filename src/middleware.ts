import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Allow next internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static')) {
    return NextResponse.next()
  }

  // Protect /workspace and its subroutes
  if (pathname.startsWith('/workspace')) {
    try {
      const supabase = createServerSupabaseClient()
      const { data } = await supabase.auth.getSession()
      const session = data?.session
      if (!session) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    } catch (e) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/workspace/:path*'],
}
