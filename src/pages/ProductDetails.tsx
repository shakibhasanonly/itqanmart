import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { Minus, Plus, ShoppingCart, Zap, ChevronRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import ImageGallery from '../components/ImageGallery'

export default function ProductDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-lg text-slate-600">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block text-brand-600 hover:underline">Back to Shop</Link>
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate(`/checkout?buy=${product.id}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-slate-400">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-brand-600">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-600">{product.name}</span>
      </nav>

      <div className="mt-5 grid gap-6 md:grid-cols-2 lg:gap-10">
        {/* Gallery */}
        <div className="animate-fade-in">
          <ImageGallery images={product.images} alt={product.name} />
        </div>

        {/* Info */}
        <div className="animate-fade-in">
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
            {product.category}
          </span>
          <h1 className="mt-3 text-xl font-bold text-slate-800 sm:text-2xl">{product.name}</h1>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-brand-600">৳{product.price}</span>
            <span className="text-base text-slate-400 line-through">৳{product.originalPrice}</span>
            <span className="rounded-full bg-accent-500 px-2 py-0.5 text-xs font-bold text-white">
              {discount}% OFF
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.description}</p>

          <ul className="mt-4 space-y-1.5">
            {product.longDescription.map((line, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                {line}
              </li>
            ))}
          </ul>

          {/* Quantity */}
          <div className="mt-5 flex items-center gap-3">
            <span className="bn text-sm font-medium text-slate-700">পরিমাণ:</span>
            <div className="flex items-center rounded-lg border border-slate-200">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-slate-50 transition"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium text-slate-800">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-slate-50 transition"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-brand-300 bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="bn">কার্টে যোগ করুন</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              <Zap className="h-4 w-4" />
              <span className="bn">এখনই কিনুন</span>
            </button>
          </div>

          {/* Delivery info */}
          <div className="mt-6 space-y-2.5 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <Truck className="h-4 w-4 text-brand-500" />
              <span>Delivery across Bangladesh — 2-4 business days</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <ShieldCheck className="h-4 w-4 text-brand-500" />
              <span>Quality checked before dispatch</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <RotateCcw className="h-4 w-4 text-brand-500" />
              <span>7-day exchange for damaged or faulty items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
