import { Link } from 'react-router-dom'
import { FaFilePdf } from 'react-icons/fa6'
import { presentations } from '../shared/presentations'

export function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', paddingTop: 32, paddingLeft: 32 }}
    >
      <main
        className="mx-auto max-w-6xl grow px-16 sm:px-24 pt-20 sm:pt-28 pb-12"
        style={{ fontSize: 20, fontWeight: 800 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">Presentations</h1>
        <p className="text-gray-700 mb-10">Choose a deck to open fullscreen. Use Left/Right arrows to flip pages, F to toggle fullscreen.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {presentations.map((p) => (
            <Link
              key={p.slug}
              to={`/view/${p.slug}`}
              className="group rounded-2xl border-2 border-sky-300 bg-white/70 backdrop-blur-sm hover:border-sky-400 hover:shadow-xl hover:bg-white transition overflow-hidden"
            >
              <div className="aspect-[4/3] bg-white/80 grid place-items-center">
                <FaFilePdf className="text-brand-600 w-16 h-16 opacity-90 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <div className="font-bold text-lg">{p.title}</div>
                <div className="text-sm text-gray-600 truncate">{p.filename}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer className="border-t border-white/50 bg-white/60 backdrop-blur-sm py-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} AD Biogas Indonesia
      </footer>
    </div>
  )
}


