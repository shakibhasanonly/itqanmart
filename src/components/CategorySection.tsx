import { Link } from 'react-router-dom'
import { Fan, Heart, Plug, Lamp, Clock } from 'lucide-react'
import { categories } from '../data/products'

const iconMap: Record<string, typeof Fan> = {
  fan: Fan,
  heart: Heart,
  plug: Plug,
  lamp: Lamp,
  clock: Clock,
}

export default function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-center text-lg font-semibold text-slate-800 sm:text-xl">
        Shop by Category
      </h2>
      <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Fan
          return (
            <Link
              key={cat.name}
              to={`/shop?cat=${encodeURIComponent(cat.name)}`}
              className="flex w-24 flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white p-3 transition hover:border-brand-200 hover:shadow-sm sm:w-32 sm:p-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 sm:h-14 sm:w-14">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <span className="text-xs font-medium text-slate-700 sm:text-sm">{cat.name}</span>
              <span className="bn text-[11px] text-slate-400 sm:text-xs">{cat.bn}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
