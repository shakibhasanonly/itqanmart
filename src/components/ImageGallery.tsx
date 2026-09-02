import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ImageGalleryProps = {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (images.length === 0) return null

  const showPrevious = () => {
    setActiveIdx((current) => (current === 0 ? images.length - 1 : current - 1))
  }

  const showNext = () => {
    setActiveIdx((current) => (current === images.length - 1 ? 0 : current + 1))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
        <img
          src={images[activeIdx]}
          alt={`${alt} image ${activeIdx + 1}`}
          className="h-full w-full object-cover transition-opacity duration-300"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous product image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white hover:text-brand-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next product image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white hover:text-brand-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-slate-900/45 px-2 py-1.5">
              {images.map((image, idx) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`View product image ${idx + 1}`}
                  aria-current={idx === activeIdx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              type="button"
              key={img}
              onClick={() => setActiveIdx(idx)}
              aria-label={`View product image ${idx + 1}`}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                idx === activeIdx ? 'border-brand-500' : 'border-slate-100 hover:border-brand-300'
              }`}
            >
              <img src={img} alt={`${alt} thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
