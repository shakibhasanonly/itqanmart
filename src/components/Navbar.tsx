import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Search } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { totalItems } = useCart()
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.search])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/shop')
    }
  }

  const navLinkClass = (path: string) =>
    `text-sm font-medium transition-colors hover:text-brand-600 ${
      location.pathname === path ? 'text-brand-600' : 'text-slate-700'
    }`

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/itqan-logo.png" alt="Itqan Mart" className="h-9 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/shop" className={navLinkClass('/shop')}>Shop</Link>
            <Link to="/contact" className={navLinkClass('/contact')}>Contact</Link>
          </nav>

          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs items-center">
            <div className="relative w-full">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পণ্য খুঁজুন... Search products"
                className="bn w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-4 pr-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-600 transition" aria-label="Search">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Cart + hamburger */}
          <div className="flex items-center gap-1 shrink-0">
            <Link to="/cart" className="relative p-2 text-slate-700 hover:text-brand-600 transition" aria-label="Cart">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-brand-600 transition"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden animate-slide-down border-t border-slate-100 py-4 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পণ্য খুঁজুন... Search products"
                className="bn w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-sm placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Search">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <nav className="flex flex-col gap-1">
              <Link to="/" className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition">Home</Link>
              <Link to="/shop" className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition">Shop</Link>
              <Link to="/contact" className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition">Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
