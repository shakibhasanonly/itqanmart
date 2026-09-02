import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Copy, Check, MessageCircle, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { PAYMENT_NUMBER, WHATSAPP_NUMBER } from '../data/products'
import { supabase } from '../lib/supabase'

type PaymentMethod = 'bkash' | 'nagad' | 'cod'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const [searchParams] = useSearchParams()
  const buyId = searchParams.get('buy')

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash')
  const [trxId, setTrxId] = useState('')
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [error, setError] = useState('')

  // If "Buy Now" was used, ensure cart has at least that item
  useEffect(() => {
    if (buyId && items.length === 0) {
      // Redirect won't help — the Buy Now flow already adds to cart before navigating
      // This is a fallback in case cart was cleared
    }
  }, [buyId, items.length])

  const requiresTrx = paymentMethod === 'bkash' || paymentMethod === 'nagad'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_NUMBER)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Could not copy. Please copy manually.')
    }
  }

  const validate = (): string | null => {
    if (!name.trim()) return 'Please enter your full name.'
    if (!phone.trim()) return 'Please enter your phone number.'
    if (!address.trim()) return 'Please enter your full address.'
    if (requiresTrx && !trxId.trim()) return 'Please enter your Transaction ID.'
    return null
  }

  const handleConfirmOrder = async () => {
    const v = validate()
    if (v) {
      setError(v)
      return
    }
    setError('')
    setSubmitting(true)

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          payment_method: paymentMethod,
          transaction_id: requiresTrx ? trxId.trim() : null,
          total: total,
        })
        .select('id')
        .single()

      if (orderError || !orderData) {
        throw new Error('Order could not be placed.')
      }

      const orderItems = items.map((item) => ({
        order_id: orderData.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      setOrderComplete(true)
      clearCart()
    } catch {
      setError('Could not place your order. Please try again or order via WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const itemList = items
      .map((i) => `• ${i.product.name} x${i.quantity} — ৳${i.product.price * i.quantity}`)
      .join('\n')
    const msg = `Assalamu Alaikum, I'd like to order:\n\n${itemList}\n\nTotal: ৳${total}\n\nName: ${name || '—'}\nPhone: ${phone || '—'}\nAddress: ${address || '—'}\nPayment: ${paymentMethod.toUpperCase()}`
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  if (orderComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
          <Check className="h-8 w-8 text-brand-600" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-slate-800">Order Placed Successfully!</h1>
        <p className="mt-2 text-sm text-slate-500">
          Thank you for your order. We will contact you shortly to confirm delivery.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-lg font-semibold text-slate-700">Your cart is empty</h1>
        <p className="mt-1 text-sm text-slate-400">Add products before checking out.</p>
        <Link to="/shop" className="mt-5 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-slate-400">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/cart" className="hover:text-brand-600">Cart</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-600">Checkout</span>
      </nav>

      <h1 className="mt-3 text-xl font-bold text-slate-800 sm:text-2xl">Checkout</h1>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Left: Delivery Info + Payment */}
        <div className="space-y-5">
          {/* Delivery Information */}
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-800">Delivery Information</h2>
            <div className="mt-3 space-y-3">
              <div>
                <label className="bn block text-xs font-medium text-slate-600">আপনার নাম</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div>
                <label className="bn block text-xs font-medium text-slate-600">সম্পূর্ণ ঠিকানা</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="বাড়ি/রোড, থানা, জেলা"
                  rows={3}
                  className="bn mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <h2 className="bn text-sm font-semibold text-slate-800">পেমেন্টের মাধ্যম</h2>

            <div className="mt-3 space-y-2">
              {/* bKash */}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                  paymentMethod === 'bkash' ? 'border-brand-400 bg-brand-50' : 'border-slate-200 hover:border-brand-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="accent-brand-600"
                />
                <img src="/bkash-logo.png" alt="bKash" className="h-6 w-auto" />
                <div className="text-xs text-slate-500">Send Money</div>
              </label>

              {/* Nagad */}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                  paymentMethod === 'nagad' ? 'border-brand-400 bg-brand-50' : 'border-slate-200 hover:border-brand-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'nagad'}
                  onChange={() => setPaymentMethod('nagad')}
                  className="accent-brand-600"
                />
                <img src="/nagad-logo.png" alt="Nagad" className="h-6 w-auto" />
                <div className="text-xs text-slate-500">Send Money</div>
              </label>

              {/* COD */}
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                  paymentMethod === 'cod' ? 'border-brand-400 bg-brand-50' : 'border-slate-200 hover:border-brand-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-brand-600"
                />
                <div className="flex h-6 items-center text-sm font-medium text-slate-700">Cash on Delivery</div>
                <div className="text-xs text-slate-500">Pay on receipt</div>
              </label>
            </div>

            {/* Payment number + copy */}
            {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
              <div className="mt-3 rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-600">
                  Send payment to: <span className="font-semibold text-slate-800">{PAYMENT_NUMBER}</span> (Personal)
                </p>
                <button
                  onClick={handleCopy}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-brand-200 bg-white px-2.5 py-1 text-xs font-medium text-brand-700 transition hover:bg-brand-50"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" /> <span className="bn">নম্বর কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Transaction ID */}
            {requiresTrx && (
              <div className="mt-3">
                <label className="block text-xs font-medium text-slate-600">Transaction ID</label>
                <input
                  type="text"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  placeholder="TrxID"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-800">Order Summary</h2>

            <div className="mt-3 space-y-2.5">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="text-xs font-medium text-slate-700 line-clamp-2">{item.product.name}</span>
                    <span className="text-xs text-slate-400">Qty: {item.quantity} × ৳{item.product.price}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">৳{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>৳{total}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Total</span>
                <span>৳{total}</span>
              </div>
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
            )}

            {/* Buttons */}
            <div className="mt-4 space-y-2.5">
              <button
                onClick={handleConfirmOrder}
                disabled={submitting}
                className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? 'Placing Order...' : 'Confirm Order'}
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-100 sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Order via WhatsApp Instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
