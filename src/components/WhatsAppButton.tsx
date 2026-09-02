import { MessageCircle } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/8801824927718'
const PREFILL_MESSAGE = 'আসসালামু আলাইকুম, Itqan Mart থেকে একটি পণ্য সম্পর্কে জানতে চাই।'

export default function WhatsAppButton() {
  const url = `${WHATSAPP_URL}?text=${encodeURIComponent(PREFILL_MESSAGE)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Itqan Mart on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition hover:bg-green-600 hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
