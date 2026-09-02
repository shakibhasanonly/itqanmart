import { Mail, Phone, Facebook, MapPin } from 'lucide-react'
import { CONTACT_EMAIL, CONTACT_PHONE, FACEBOOK_URL } from '../data/products'

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">Contact Us</h1>
      <p className="mt-2 text-sm text-slate-500">
        Have a question about a product or your order? Reach out and we'll get back to you.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-400">Email</h3>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-medium text-slate-700 hover:text-brand-600 transition">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-400">Phone</h3>
              <a href={`tel:${CONTACT_PHONE}`} className="text-sm font-medium text-slate-700 hover:text-brand-600 transition">
                {CONTACT_PHONE}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Facebook className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-400">Facebook</h3>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-700 hover:text-brand-600 transition">
                facebook.com/itqanbd
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-400">Delivery</h3>
              <p className="text-sm font-medium text-slate-700">All across Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
