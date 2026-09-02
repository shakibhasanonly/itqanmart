import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, total, totalItems } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-slate-200" />
        <h2 className="mt-4 text-lg font-semibold text-slate-700">Your cart is empty</h2>
        <p className="mt-1 text-sm text-slate-400">Browse our products and add something you like.</p>
        <Link
          to="/shop"
          className="mt-5 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">Shopping Cart</h1>
      <p className="mt-1 text-sm text-slate-500">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3"
            >
              <Link to={`/product/${item.product.slug}`} className="shrink-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="text-sm font-medium text-slate-800 hover:text-brand-600 transition line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="shrink-0 text-slate-400 hover:text-red-500 transition"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-bold text-brand-600">৳{item.product.price}</span>
                  <span className="text-xs text-slate-400 line-through">৳{item.product.originalPrice}</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-lg border border-slate-200">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center text-slate-600 hover:bg-slate-50 transition"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center text-slate-600 hover:bg-slate-50 transition"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    ৳{item.product.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-800">Order Summary</h2>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-slate-800">
                <span>Total</span>
                <span>৳{total}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="mt-4 w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
