export type Product = {
  id: string
  name: string
  slug: string
  category: string
  categoryBn: string
  price: number
  originalPrice: number
  description: string
  images: string[]
  longDescription: string[]
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Life Portable Mini Handheld Fan',
    slug: 'life-portable-mini-handheld-fan',
    category: 'Fans',
    categoryBn: 'ফ্যান',
    price: 720,
    originalPrice: 900,
    description: 'Compact rechargeable handheld fan with 3 speed levels and LED display.',
    images: ['/fan-alife-1.jpg', '/fan-alife-2_.jpg', '/fan-alife-3.jpg'],
    longDescription: [
      'Three adjustable speed levels for personalised cooling.',
      'Built-in rechargeable battery with USB charging.',
      'LED display showing remaining battery and speed.',
      'Lightweight and pocket-friendly design for everyday carry.',
    ],
  },
  {
    id: 'p2',
    name: 'Smart Scalp Massager',
    slug: 'smart-scalp-massager',
    category: 'Wellness',
    categoryBn: 'স্বাস্থ্য',
    price: 650,
    originalPrice: 800,
    description: 'Gentle silicone-node scalp and neck massager with multiple modes.',
    images: ['/massager-1.jpg', '/massager-2_.jpg'],
    longDescription: [
      'Soft silicone nodes for a soothing scalp and neck massage.',
      'Multiple vibration modes and intensity levels.',
      'Ergonomic handheld grip for comfortable use.',
      'USB rechargeable with long battery life.',
    ],
  },
  {
    id: 'p3',
    name: 'Strong Handheld Fan',
    slug: 'strong-handheld-fan',
    category: 'Fans',
    categoryBn: 'ফ্যান',
    price: 720,
    originalPrice: 800,
    description: 'High-power turbo handheld fan with strong airflow and long battery.',
    images: ['/turbofan-1_.jpg', '/turbofan-2.jpg'],
    longDescription: [
      'Powerful turbo motor delivering strong, steady airflow.',
      'Three speed settings with a quick-charge USB-C port.',
      'Durable build suitable for outdoor and indoor use.',
      'Foldable handle for easy storage and travel.',
    ],
  },
  {
    id: 'p4',
    name: 'Auto-eject WHEN Full X01 Charging Separator',
    slug: 'auto-eject-when-full-x01-charging-separator',
    category: 'Accessories',
    categoryBn: 'অ্যাক্সেসরিজ',
    price: 650,
    originalPrice: 990,
    description: 'Smart charging separator that auto-ejects when the battery is full.',
    images: ['/adp.png','/adapter-1_.jpg', '/adapter-2.jpg'],
    longDescription: [
      'Automatically disconnects power once the battery is full to prevent overcharging.',
      'Compact separator design compatible with common chargers.',
      'LED indicator shows charging and auto-eject status.',
      'Helps protect battery health and extend device lifespan.',
    ],
  },
  {
    id: 'p5',
    name: 'Camping Retro Nightlight Lantern',
    slug: 'camping-retro-nightlight-lantern',
    category: 'Lighting',
    categoryBn: 'লাইটিং',
    price: 700,
    originalPrice: 820,
    description: 'Retro-style camping lantern with warm nightlight and long battery life.',
    images: ['/lantern-1.jpg', '/lantern-2.jpg', '/lantern-3.jpg', '/light.jpeg'],
    longDescription: [
      'Warm retro-style nightlight perfect for camping and power cuts.',
      'Adjustable brightness levels for the right ambience.',
      'Rechargeable battery providing hours of continuous light.',
      'Portable and durable build for outdoor use.',
    ],
  },
  {
    id: 'p6',
    name: 'Electronic Clock',
    slug: 'electronic-clock',
    category: 'Home',
    categoryBn: 'হোম',
    price: 600,
    originalPrice: 850,
    description: 'Minimal electronic clock with clear display and alarm function.',
    images: ['/clock-1.jpg', '/clock-2_.jpg'],
    longDescription: [
      'Clear, easy-to-read digital display.',
      'Built-in alarm with adjustable settings.',
      'Compact design that fits any desk or shelf.',
      'Battery powered for flexible placement.',
    ],
  },
]

export const categories = [
  { name: 'Fans', bn: 'ফ্যান', icon: 'fan' },
  { name: 'Wellness', bn: 'স্বাস্থ্য', icon: 'heart' },
  { name: 'Accessories', bn: 'অ্যাক্সেসরিজ', icon: 'plug' },
  { name: 'Lighting', bn: 'লাইটিং', icon: 'lamp' },
  { name: 'Home', bn: 'হোম', icon: 'clock' },
]

export const PAYMENT_NUMBER = '01516-535198'
export const WHATSAPP_NUMBER = '+8801824-927718'
export const CONTACT_PHONE = '+8801784-162130'
export const CONTACT_EMAIL = 'itqanmart26@gmail.com'
export const FACEBOOK_URL = 'https://www.facebook.com/itqanbd'
