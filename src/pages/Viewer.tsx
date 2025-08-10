import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findPresentationBySlug } from '../shared/presentations'

export function Viewer() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement | null>(null)
  

  const deck = findPresentationBySlug(slug || '')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'f') toggleFullscreen()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function toggleFullscreen() {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  if (!deck) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="text-center">
          <p className="text-lg mb-4">Presentation not found.</p>
          <button className="px-4 py-2 rounded bg-gray-900 text-white" onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', paddingTop: 32, paddingLeft: 32 }}
    >
      <div className="pt-20 sm:pt-28 pb-10 px-16 sm:px-24" style={{ fontSize: 20, fontWeight: 800 }}>
        <div className="text-gray-700 mb-6 text-center">
          <a
            className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 align-middle whitespace-nowrap rounded-xl border border-gray-300 bg-white text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold hover:bg-gray-50 shadow-sm align-middle"
            href={`/assets/${encodeURIComponent(deck.filename)}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Open presentation in new tab"
          >
            <span className="sm:hidden">Open tab</span>
            <span className="hidden sm:inline">Open In New Tab</span>
          </a>
        </div>
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-lg overflow-hidden border border-white/70">
          <iframe
            title={deck.title}
            src={`/assets/${encodeURIComponent(deck.filename)}#zoom=page-width`}
            className="w-full h-[82vh]"
            allow="fullscreen"
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 align-middle whitespace-nowrap rounded-xl bg-brand-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-semibold hover:bg-brand-700 shadow align-middle"
            aria-label="Back to home"
          >
            <span className="sm:hidden">Home</span>
            <span className="hidden sm:inline">Back To Home</span>
          </button>
        </div>
      </div>
    </div>
  )
}


