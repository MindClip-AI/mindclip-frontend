export default function WorkspacePage() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col gap-4 lg:grid lg:grid-cols-[65fr_35fr] lg:gap-0">
      <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-slate-100 p-6 text-center text-slate-500 lg:min-h-full">
        Área del Reproductor Multimedia
      </div>

      <aside className="rounded-xl border border-slate-200 bg-white lg:rounded-l-none lg:border-l lg:border-y-0 lg:border-r-0">
        <div className="border-b border-slate-200 px-4 py-3">
          <div className="inline-flex rounded-lg bg-slate-100 p-1">
            <button type="button" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm">
              Tutor IA
            </button>
            <button type="button" className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
              Quizzes
            </button>
          </div>
        </div>
      </aside>
    </section>
  )
}
