'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Upload } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function WorkspaceDashboardPage() {
  const router = useRouter()
  const [activeInput, setActiveInput] = useState<'youtube' | 'audio'>('youtube')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [error, setError] = useState('')
  const supabase = createClient()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()

    const cleanUrl = youtubeUrl.trim()
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/

    if (!cleanUrl || !youtubeRegex.test(cleanUrl)) {
      setError('Por favor, ingresa un enlace válido de YouTube.')
      return
    }

    try {
      setIsAnalyzing(true)
      setError('')

      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user
      if (!user) throw new Error('No authenticated user')

      const { data, error: insertError } = await supabase
        .from('contents')
        .insert({
          user_id: user.id,
          title: 'Video en proceso...',
          source_type: 'youtube',
          source_url: cleanUrl,
          status: 'processing',
        })
        .select('id')
        .single()

      if (insertError) throw insertError

      await router.refresh()
      router.push('/workspace/' + data.id)
    } catch (err) {
      setError('Hubo un problema al guardar el video. Intenta de nuevo.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const previousSessions = [
    { id: 'demo-123', title: 'Neurociencia del aprendizaje acelerado', timeAgo: 'Hace 2 horas' },
    { id: 'demo-234', title: 'Introducción a Machine Learning', timeAgo: 'Hace 5 horas' },
    { id: 'demo-345', title: 'Historia económica moderna', timeAgo: 'Hace 1 día' },
    { id: 'demo-456', title: 'Fundamentos de React y estado', timeAgo: 'Hace 2 días' },
    { id: 'demo-567', title: 'Técnicas de memorización activa', timeAgo: 'Hace 3 días' },
    { id: 'demo-678', title: 'Programación orientada a objetos', timeAgo: 'Hace 1 semana' },
  ]

  return (
    <section className="mx-auto w-full max-w-6xl py-8">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">NUEVA SESIÓN</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">¿Qué vas a estudiar hoy?</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
          Pega un enlace de YouTube o sube un archivo de audio generaremos capítulos, un quiz y un tutor de IA con contexto en segundos.
        </p>
      </header>

      <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex gap-6 border-b border-slate-200 text-sm">
          <button
            type="button"
            onClick={() => setActiveInput('youtube')}
            className={`pb-3 ${activeInput === 'youtube' ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Enlace de YouTube
          </button>
          <button
            type="button"
            onClick={() => setActiveInput('audio')}
            className={`pb-3 ${activeInput === 'audio' ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Subir Archivo de Audio
          </button>
        </div>

        {activeInput === 'youtube' ? (
          <form onSubmit={handleAnalyze} noValidate className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => {
                setYoutubeUrl(e.target.value)
                if (error) setError('')
              }}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
                        <button type="submit" disabled={isAnalyzing} className={`rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {isAnalyzing ? 'Procesando...' : 'Analizar ->'}
            </button>
          </form>
        ) : (
          <div className="mt-5 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <Upload className="h-6 w-6 text-slate-500" />
            </div>
            <p className="font-semibold text-slate-700">Suelta tu archivo de audio aquí</p>
            <p className="mt-1 text-xs text-slate-400">MP3 - WAV - M4A - hasta 500 MB</p>
            <button type="button" className="mt-4 rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
              Explorar archivos
            </button>
          </div>
        )}

        {error && <p className="text-sm text-red-500 mt-2 font-medium">{error}</p>}
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-500">SESIONES ANTERIORES</h2>
          <span className="text-sm text-slate-400">6 elementos</span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {previousSessions.map((session) => (
            <Link key={session.id} href="/workspace/demo-123" className="rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-sm">
              <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-slate-100 text-slate-400">Miniatura</div>
              <p className="text-sm font-semibold text-slate-900">{session.title}</p>
              <p className="mt-1 text-xs text-slate-500">{session.timeAgo}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  )
}



