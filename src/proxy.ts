import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/workspace')) {
    try {
      const supabase = await createServerSupabaseClient()
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    } catch {
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
