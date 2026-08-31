'use client'

import { PlayCircle } from 'lucide-react'
import { useState } from 'react'

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<'chapters' | 'chat' | 'quizzes'>('chapters')

  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col gap-4 lg:grid lg:grid-cols-[65fr_35fr] lg:gap-0">
      <div className="space-y-4 lg:pr-4">
        <div className="relative aspect-video rounded-xl bg-black shadow-lg">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <PlayCircle className="h-16 w-16 text-white/80" />
            <p className="text-sm text-white/80">Reproductor de Video</p>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900">Cómo dominar MindClip AI en tu estudio diario</h1>
          <p className="mt-1 text-sm text-slate-500">
            Resumen del contenido: aprende a estructurar tus sesiones, capturar ideas clave y convertirlas en resultados accionables.
          </p>
        </div>
      </div>

      <aside className="rounded-xl border border-slate-200 bg-white lg:rounded-l-none lg:border-l lg:border-y-0 lg:border-r-0">
        <div className="border-b border-slate-200 px-4 pt-3">
          <div className="flex gap-5 text-sm">
            <button
              type="button"
              onClick={() => setActiveTab('chapters')}
              className={`pb-3 ${activeTab === 'chapters' ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Capítulos
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`pb-3 ${activeTab === 'chat' ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Tutor IA
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('quizzes')}
              className={`pb-3 ${activeTab === 'quizzes' ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Quizzes
            </button>
          </div>
        </div>

        <div className="flex min-h-[320px] flex-col p-4">
          {activeTab === 'chapters' ? (
            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Marcas de tiempo</p>
              <ul className="space-y-2">
                <li className="rounded-md bg-slate-50 px-3 py-2">00:00 - Introducción</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">03:24 - Conceptos clave</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">08:41 - Ejemplo práctico</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">12:15 - Resumen final</li>
              </ul>
            </div>
          ) : null}

          {activeTab === 'chat' ? (
            <div className="flex h-full flex-col">
              <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                Historial del chat con el Tutor IA
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Escribe tu pregunta..."
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          ) : null}

          {activeTab === 'quizzes' ? (
            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Pregunta de opción múltiple</p>
              <div className="rounded-md border border-slate-200 p-3">¿Qué sección resume los puntos más importantes del video?</div>
              <ul className="space-y-2">
                <li className="rounded-md bg-slate-50 px-3 py-2">A) Introducción</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">B) Conceptos clave</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">C) Resumen final</li>
              </ul>
            </div>
          ) : null}
        </div>
      </aside>
    </section>
  )
}
