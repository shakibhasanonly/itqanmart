import { Link } from 'react-router-dom'
import { Mail, Phone, Facebook } from 'lucide-react'
import { CONTACT_EMAIL, CONTACT_PHONE, FACEBOOK_URL } from '../data/products'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src="/itqan-logo.png" alt="Itqan Mart" className="h-8 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              Smart gadgets and accessories for everyday life. Quality products, fair prices, fast delivery.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-brand-600 transition">Home</Link></li>
              <li><Link to="/shop" className="hover:text-brand-600 transition">Shop</Link></li>
              <li><Link to="/contact" className="hover:text-brand-600 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">Get in Touch</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-500" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-600 transition">{CONTACT_EMAIL}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-500" />
                <a href={`tel:${CONTACT_PHONE}`} className="hover:text-brand-600 transition">{CONTACT_PHONE}</a>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-brand-500" />
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition">Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Itqan Mart. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
