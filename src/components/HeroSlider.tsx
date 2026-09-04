import { useState, useEffect, useCallback } from 'react'

const slides = ['/hero-1.jpg', '/Picsart_26-09-04_10-44-45-972.jpg.jpeg', '/hero-2.jpeg', '/hero-3.jpeg']
const SLIDE_INTERVAL = 3000

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const goTo = (idx: number) => setCurrent(idx)

  useEffect(() => {
    const timer = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full overflow-hidden bg-slate-50">
      <div className="relative h-[220px] sm:h-[340px] md:h-[440px] lg:h-[520px]">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide}
              alt={`Banner ${idx + 1}`}
              className="h-full w-full object-contain object-center"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === current ? 'w-6 bg-brand-600' : 'w-2 bg-white/70 hover:bg-white'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
