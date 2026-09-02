import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { ShoppingCart, Zap } from 'lucide-react'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [imgIdx] = useState(0)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    navigate(`/checkout?buy=${product.id}`)
  }

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white transition-all hover:border-brand-200 hover:shadow-md">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute left-2 top-2 rounded-full bg-accent-500 px-2 py-0.5 text-[11px] font-bold text-white">
            -{discount}%
          </span>
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {product.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === imgIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-medium text-slate-800 leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-base font-bold text-brand-600">৳{product.price}</span>
            <span className="text-xs text-slate-400 line-through">৳{product.originalPrice}</span>
          </div>

          <div className="mt-2.5 flex gap-1.5">
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-brand-200 bg-brand-50 px-2 py-1.5 text-xs font-medium text-brand-700 transition hover:bg-brand-100"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="bn">কার্টে যোগ করুন</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-brand-600 px-2 py-1.5 text-xs font-medium text-white transition hover:bg-brand-700"
            >
              <Zap className="h-3.5 w-3.5" />
              <span className="bn">এখনই কিনুন</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
