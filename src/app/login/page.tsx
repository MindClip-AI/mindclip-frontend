'use client'

import React, { useState } from 'react'
import supabase from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Google } from 'lucide-react'

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
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    router.push('/workspace')
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
      <div className="w-full max-w-md bg-slate-800/70 backdrop-blur rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-md bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded-md bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-2 text-sm text-slate-300">{showPassword ? 'Ocultar' : 'Mostrar'}</button>
            </div>
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button type="submit" className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60">{loading ? 'Cargando...' : 'Iniciar sesión'}</button>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-slate-700" />
            <div className="text-sm text-slate-400">o</div>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          <button type="button" onClick={handleGoogle} className="w-full py-2 rounded-md bg-white text-slate-900 flex items-center justify-center gap-2 border border-slate-200">
            <Google className="w-4 h-4" />
            Continuar con Google
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-6 text-center">¿No tienes cuenta? <a href="/register" className="text-indigo-400">Registrarse</a></p>
      </div>
    </div>
  )
}
