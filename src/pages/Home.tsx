import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroSlider from '../components/HeroSlider'
import CategorySection from '../components/CategorySection'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <CategorySection />

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">Featured Products</h2>
          <Link to="/shop" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
