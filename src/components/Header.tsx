import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="AD Biogas" className="h-7 w-7" />
          <span className="text-base sm:text-lg font-semibold tracking-tight">AD Biogas Indonesia</span>
        </Link>
        <nav className="ml-auto flex items-center gap-3 text-sm">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a
            href="https://www.figma.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            Figma
          </a>
        </nav>
      </div>
    </header>
  )
}


