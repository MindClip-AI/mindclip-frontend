'use client'

import React, { useState } from 'react'
import supabase from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'

const getErrorMessage = (error: unknown) => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message
    return typeof message === 'string' ? message : undefined
  }

  return undefined
}

const translateSupabaseError = (message?: string) => {
  if (message === 'Invalid login credentials') {
    return 'Correo o contraseña incorrectos'
  }

  if (message === 'User already registered') {
    return 'Este correo ya está registrado'
  }

  return 'Ocurrió un error inesperado, intenta de nuevo'
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError(translateSupabaseError(error.message))
        return
      }

      router.refresh()
      router.push('/workspace')
    } catch (err: unknown) {
      setError(translateSupabaseError(getErrorMessage(err)))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    setError(null)

    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/workspace`,
        },
      })
    } catch (err: unknown) {
      setError(translateSupabaseError(getErrorMessage(err)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
          <div>
            <label className="block text-sm mb-1 text-slate-700">Email</label>
            <input disabled={loading} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-md bg-slate-50 text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-700">Contraseña</label>
            <div className="relative">
              <input disabled={loading} type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded-md bg-slate-50 text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button type="button" disabled={loading} onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-2 text-sm text-slate-500">{showPassword ? 'Ocultar' : 'Mostrar'}</button>
            </div>
          </div>

          {error && <div className="text-sm text-red-500" role="alert">{error}</div>}

          <button disabled={loading} type="submit" className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white flex items-center justify-center gap-2">
            <span>{loading ? 'Cargando...' : 'Iniciar sesión'}</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-slate-200" />
            <div className="text-sm text-slate-400">o</div>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button disabled={loading} type="button" onClick={handleGoogle} className="w-full py-2 rounded-md bg-white text-slate-900 flex items-center justify-center gap-2 border border-slate-200">
            <Globe className="w-5 h-5 mr-2" />
            <span>Continuar con Google</span>
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6 text-center">¿No tienes cuenta? <a href="/register" className="text-indigo-600">Registrarse</a></p>
      </div>
    </div>
  )
}

