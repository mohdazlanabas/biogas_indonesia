import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFilePdf } from 'react-icons/fa6'
import { presentations } from '../shared/presentations'

export function Home() {
  const [now, setNow] = useState<Date>(new Date())
  const [locationText, setLocationText] = useState<string>('')

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setLocationText(`Timezone: ${timeZone}`)

    const intervalId = window.setInterval(() => setNow(new Date()), 60_000)

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          const lat = latitude.toFixed(4)
          const lon = longitude.toFixed(4)
          setLocationText(`Lat ${lat}, Lon ${lon} — ${timeZone}`)
        },
        () => {
          // keep timezone-only text on error/denied
        },
      )
    }

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', paddingTop: 32, paddingLeft: 32 }}
    >
      <main
        className="mx-auto max-w-6xl grow px-16 sm:px-24 pt-20 sm:pt-28 pb-28 sm:pb-12"
        style={{ fontSize: 20, fontWeight: 800 }}
      >
        <p className="text-gray-700 mb-24">Choose A Deck To Open Fullscreen.</p>
        <p> -------------------------------- </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
          {presentations.map((p) => (
            <Link
              key={p.slug}
              to={`/view/${p.slug}`}
              className="group block rounded-2xl border-4 border-gray-800 bg-white shadow-sm hover:shadow-2xl transition overflow-hidden"
            >
              <div className="aspect-[4/3] bg-white grid place-items-center border-b border-gray-200">
                <FaFilePdf className="text-brand-600 w-16 h-16 opacity-90 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <div className="font-bold text-lg">{p.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-gray-800">
        <div className="max-w-6xl mx-auto px-16 sm:px-24">
          <div className="h-1 bg-gray-800/80 rounded mb-4" />
          <div className="mb-2">&nbsp;</div>
          <div>© {new Date().getFullYear()} AD Biogas Indonesia</div>
          <div className="mt-2">{now.toLocaleString()} — {locationText}</div>
        </div>
      </footer>
    </div>
  )
}


