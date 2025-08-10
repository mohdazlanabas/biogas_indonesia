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
      if (e.key === 'Escape') navigate('/')
      if (e.key.toLowerCase() === 'f') toggleFullscreen()
      if (e.key === 'ArrowLeft') window.history.back()
      if (e.key === 'ArrowRight') window.history.forward()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-200 text-lg font-bold">
      <div className="px-8 sm:px-14 pt-12 sm:pt-16 pb-8">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-lg overflow-hidden border border-white/70">
          <iframe
            title={deck.title}
            src={`/assets/${encodeURIComponent(deck.filename)}#toolbar=0&navpanes=0`}
            className="w-full h-[80vh]"
          />
        </div>
        <div className="text-gray-700 mt-5 text-left text-base">
          Tip: press F for fullscreen, Esc to exit. Open in new tab for page thumbnails.
        </div>
      </div>
    </div>
  )
}


