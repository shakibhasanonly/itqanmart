import { useMemo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const activeCat = searchParams.get('cat') ?? ''
  const [searchInput, setSearchInput] = useState(query)

  useEffect(() => {
    setSearchInput(query)
  }, [query])

  const filtered = useMemo(() => {
    let list = products
    if (activeCat) {
      list = list.filter((p) => p.category === activeCat)
    }
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }
    return list
  }, [query, activeCat])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const newParams = new URLSearchParams(searchParams)
    if (searchInput.trim()) {
      newParams.set('q', searchInput.trim())
    } else {
      newParams.delete('q')
    }
    setSearchParams(newParams)
  }

  const setCategory = (cat: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (cat) {
      newParams.set('cat', cat)
    } else {
      newParams.delete('cat')
    }
    setSearchParams(newParams)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">Shop</h1>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="relative mt-4 max-w-md">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="পণ্য খুঁজুন... Search products"
          className="bn w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-sm placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-600" aria-label="Search">
          <Search className="h-4 w-4" />
        </button>
      </form>

      {/* Category filter */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory('')}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
            !activeCat ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.name}
            onClick={() => setCategory(c.name)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              activeCat === c.name ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="bn text-lg text-slate-500">কোনো পণ্য পাওয়া যায়নি</p>
          <p className="mt-1 text-sm text-slate-400">No products found. Try a different search.</p>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
