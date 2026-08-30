'use client'

import React, { useState, useMemo } from 'react'
import supabase from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Google } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checks = useMemo(() => ({
    length: password.length >= 8,
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }), [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    // After sign up, redirect to workspace (or to confirm flow if enabled)
    router.push('/workspace')
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-slate-900 text-center">Crear cuenta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-slate-700">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-md bg-slate-50 text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-700">Contraseña</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded-md bg-slate-50 text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-2 text-sm text-slate-500">{showPassword ? 'Ocultar' : 'Mostrar'}</button>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-medium mb-2 text-slate-700">La contraseña debe tener:</p>
            <ul className="space-y-1">
              <li className={`flex items-center gap-2 ${checks.length ? 'text-green-600' : 'text-slate-400'}`}><span className="w-3 h-3 rounded-full bg-current inline-block" /> Mínimo 8 caracteres</li>
              <li className={`flex items-center gap-2 ${checks.number ? 'text-green-600' : 'text-slate-400'}`}><span className="w-3 h-3 rounded-full bg-current inline-block" /> Al menos un número</li>
              <li className={`flex items-center gap-2 ${checks.symbol ? 'text-green-600' : 'text-slate-400'}`}><span className="w-3 h-3 rounded-full bg-current inline-block" /> Al menos un símbolo</li>
            </ul>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button type="submit" disabled={!(checks.length && checks.number && checks.symbol)} className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white">{loading ? 'Creando...' : 'Crear cuenta'}</button>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-slate-200" />
            <div className="text-sm text-slate-400">o</div>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button type="button" onClick={handleGoogle} className="w-full py-2 rounded-md bg-white text-slate-900 flex items-center justify-center gap-2 border border-slate-200">
            <Google className="w-4 h-4" />
            Continuar con Google
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6 text-center">¿Ya tienes cuenta? <a href="/login" className="text-indigo-600">Iniciar sesión</a></p>
      </div>
    </div>
  )
}
