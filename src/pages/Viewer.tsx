import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { findPresentationBySlug } from '../shared/presentations'
import { FaArrowRight, FaExpand } from 'react-icons/fa6'

export function Viewer() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

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
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
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
    <div ref={containerRef} className="min-h-screen bg-black">
      <div className="fixed top-0 left-0 right-0 z-20 p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
        <Link to="/" className="inline-flex items-center gap-2 rounded bg-white/90 hover:bg-white px-3 py-2 text-sm">
          <img src="/logo.svg" alt="logo" className="h-5 w-5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <a
          href={`/assets/${encodeURIComponent(deck.filename)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded bg-white/90 hover:bg-white px-3 py-2 text-sm"
        >
          <FaArrowRight /> <span className="hidden sm:inline">Open in new tab</span>
        </a>
        <button
          onClick={toggleFullscreen}
          className="ml-auto inline-flex items-center gap-2 rounded bg-white/90 hover:bg-white px-3 py-2 text-sm"
        >
          <FaExpand /> <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
        </button>
      </div>

      <div className="pt-16 pb-4 sm:pt-20 sm:pb-6 container mx-auto px-2 sm:px-6">
        <div className="bg-white rounded-lg shadow overflow-hidden aspect-[16/10]">
          <iframe
            title={deck.title}
            src={`/assets/${encodeURIComponent(deck.filename)}#toolbar=0&navpanes=0`}
            className="w-full h-full"
          />
        </div>
        <div className="text-white/80 mt-3 text-center text-sm">
          Tip: press F for fullscreen, Esc to exit, open in new tab for page thumbnails.
        </div>
      </div>
    </div>
  )
}


