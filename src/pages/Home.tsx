import { Link } from 'react-router-dom'
import { FaFilePdf } from 'react-icons/fa6'
import { presentations } from '../shared/presentations'

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="mx-auto max-w-6xl grow px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Presentations</h1>
        <p className="text-gray-600 mb-6">Choose a deck to open fullscreen. Use Left/Right arrows to flip pages, F to toggle fullscreen.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {presentations.map((p) => (
            <Link
              key={p.slug}
              to={`/view/${p.slug}`}
              className="group rounded-xl border hover:shadow-lg transition overflow-hidden"
            >
              <div className="aspect-[4/3] bg-gray-50 grid place-items-center">
                <FaFilePdf className="text-brand-600 w-14 h-14 opacity-80 group-hover:opacity-100" />
              </div>
              <div className="p-4">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-500 truncate">{p.filename}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AD Biogas Indonesia
      </footer>
    </div>
  )
}


