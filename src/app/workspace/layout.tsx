'use client'

import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabase/client'

type WorkspaceLayoutProps = {
  children: ReactNode
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="fixed inset-x-0 top-0 z-20 h-16 bg-white border-b border-slate-200">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-lg font-semibold tracking-tight text-slate-900">MindClip AI</div>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main className="pt-16">
        <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  )
}
