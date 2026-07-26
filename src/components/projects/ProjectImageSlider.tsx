import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X, Image as ImageIcon } from 'lucide-react'
import type { ProjectImage } from '@/data/projectsData'
import { useI18n } from '@/i18n/i18n'

interface ProjectImageSliderProps {
  images: ProjectImage[]
}

export default function ProjectImageSlider({ images }: ProjectImageSliderProps) {
  const { t } = useI18n()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [fullscreenImage, setFullscreenImage] = useState<ProjectImage | null>(null)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, 4000)
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [images.length, isAutoPlaying])

  return (
    <div className="space-y-4">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-[rgb(var(--gold-rgb))]" />
          <h2 className="nss-display text-2xl tracking-wide text-[rgb(var(--text-rgb))]">
            {t('projects.galleryHeading')}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="nss-mono text-xs text-[rgba(var(--text-rgb),0.5)]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
          <button
            onClick={() => setIsAutoPlaying((v) => !v)}
            aria-label={isAutoPlaying ? t('projects.galleryPause') : t('projects.galleryPlay')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--gold-rgb),0.06)] text-[rgba(var(--text-rgb),0.8)] transition-all hover:border-[rgb(var(--gold-rgb))] hover:text-[rgb(var(--gold-rgb))]"
          >
            {isAutoPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      </div>

      {/* Main Hero Slider */}
      <div
        className="group relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl border border-[rgba(var(--gold-rgb),0.2)] bg-black/60 shadow-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slides */}
        {images.map((img, idx) => (
          <div
            key={img.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={img.src}
              alt={`${t('projects.galleryItemTitle')} #${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Slide Content Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <span className="nss-mono inline-block rounded bg-[rgba(var(--gold-rgb),0.15)] border border-[rgba(var(--gold-rgb),0.3)] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--gold-rgb))] font-semibold">
                  {t('projects.gallerySlide')} #{idx + 1}
                </span>
                <h3 className="nss-display text-xl md:text-3xl text-white font-semibold">
                  {t('projects.galleryItemTitle')} #{idx + 1}
                </h3>
                <p className="text-xs md:text-sm text-[rgba(var(--text-rgb),0.75)] line-clamp-2">
                  {t('projects.galleryItemCaption')} (#{idx + 1})
                </p>
              </div>

              <button
                onClick={() => setFullscreenImage(img)}
                aria-label={t('projects.galleryFullscreen')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-[rgb(var(--gold-rgb))] hover:text-black transition-all"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label={t('projects.galleryPrevious')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-80 hover:opacity-100 hover:bg-[rgb(var(--gold-rgb))] hover:text-black transition-all"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextSlide}
          aria-label={t('projects.galleryNext')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-80 hover:opacity-100 hover:bg-[rgb(var(--gold-rgb))] hover:text-black transition-all"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Thumbnail Bar */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[rgba(var(--gold-rgb),0.3)]">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setCurrentIndex(idx)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-all ${
              idx === currentIndex
                ? 'border-[rgb(var(--gold-rgb))] ring-2 ring-[rgb(var(--gold-rgb))]/40 opacity-100 scale-105'
                : 'border-transparent opacity-50 hover:opacity-90'
            }`}
          >
            <img
              src={img.src}
              alt={`${t('projects.galleryItemTitle')} #${idx + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-200">
          <button
            onClick={() => setFullscreenImage(null)}
            aria-label={t('projects.galleryClose')}
            className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50"
          >
            <X size={24} />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/15">
            <img
              src={fullscreenImage.src}
              alt={`${t('projects.galleryItemTitle')} #${images.indexOf(fullscreenImage) + 1}`}
              className="max-h-[80vh] w-full object-contain"
            />
            <div className="bg-slate-950/90 p-4 text-center border-t border-white/10">
              <h3 className="nss-display text-lg text-white font-semibold">
                {t('projects.galleryItemTitle')} #{images.indexOf(fullscreenImage) + 1}
              </h3>
              <p className="text-xs text-white/70 mt-1">
                {t('projects.galleryItemCaption')} (#{images.indexOf(fullscreenImage) + 1})
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
