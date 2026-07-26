import { useState } from 'react'
import { Play, Video, X, ChevronDown } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import type { ProjectVideo } from '@/data/projectsData'
import type { TranslationKey } from '@/i18n/translations/en'

interface ProjectVideoGalleryProps {
  videos: ProjectVideo[]
  headingKey?: TranslationKey
  descriptionKey?: TranslationKey
  featured?: boolean
  initialCount?: number
}

const INITIAL_COUNT = 16 // 4 columns x 4 rows = 16 videos initially

export default function ProjectVideoGallery({
  videos,
  headingKey,
  descriptionKey,
  featured = false,
  initialCount = INITIAL_COUNT,
}: ProjectVideoGalleryProps) {
  const { t } = useI18n()
  const [visibleCount, setVisibleCount] = useState(() => Math.min(initialCount, videos.length))
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)

  const visibleVideos = videos.slice(0, visibleCount)
  const hasMore = visibleCount < videos.length

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, videos.length))
  }

  return (
    <div
      data-featured={featured ? 'true' : undefined}
      className={`space-y-6 ${
        featured
          ? 'rounded-2xl border border-[rgba(var(--gold-rgb),0.24)] bg-[linear-gradient(145deg,rgba(var(--gold-rgb),0.08),transparent_48%)] p-4 sm:p-6'
          : ''
      }`}
    >
      {/* Header Badge */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <Video className="mt-1 h-5 w-5 shrink-0 text-[rgb(var(--gold-rgb))]" />
          <div>
            <h2 className="nss-display text-2xl tracking-wide text-[rgb(var(--text-rgb))]">
              {headingKey ? t(headingKey) : t('projects.videoHeading')}
            </h2>
            {descriptionKey && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[rgba(var(--text-rgb),0.6)]">
                {t(descriptionKey)}
              </p>
            )}
          </div>
        </div>
        {!featured && (
          <span className="nss-mono text-xs text-[rgba(var(--text-rgb),0.5)]">
            {t('projects.videoShowing')} {visibleVideos.length} {t('projects.videoOf')} {videos.length}{' '}
            {t('projects.videoCount')}
          </span>
        )}
      </div>

      {/* 4-Column Responsive Grid */}
      <div
        className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
          featured ? 'lg:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {visibleVideos.map((video, idx) => {
          const videoTitle = t(video.titleKey)
          const isPlaying = playingVideoId === video.id

          return (
            <article
              key={video.id}
              className={`group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 ${
                isPlaying
                  ? 'border-[rgb(var(--gold-rgb))] bg-[var(--panel)] shadow-xl shadow-[rgba(var(--gold-rgb),0.15)] ring-1 ring-[rgb(var(--gold-rgb))]/30'
                  : 'border-[rgba(var(--gold-rgb),0.16)] bg-[var(--panel)] hover:border-[rgb(var(--gold-rgb))] hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(var(--gold-rgb),0.1)]'
              }`}
            >
              {/* Media Area (Poster vs Inline Video) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                {isPlaying ? (
                  <>
                    <video
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      poster={video.poster}
                      className="h-full w-full object-contain bg-black"
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                    {/* Close / Stop Inline Video Button */}
                    <button
                      onClick={() => setPlayingVideoId(null)}
                      title={t('projects.videoClose')}
                      aria-label={t('projects.videoClose')}
                      className="absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-white/90 border border-white/20 hover:bg-[rgb(var(--gold-rgb))] hover:text-black transition-all"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingVideoId(video.id)}
                    aria-label={videoTitle}
                    className="relative block h-full w-full cursor-pointer text-start"
                  >
                    <img
                      src={video.poster}
                      alt={videoTitle}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Play Button Badge Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(var(--gold-rgb))] text-[#1d1233] shadow-lg shadow-[rgb(var(--gold-rgb))]/30 transition-transform duration-300 group-hover:scale-115">
                        <Play size={20} className="ml-0.5 fill-current" />
                      </div>
                    </div>

                    {/* Video Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="nss-mono rounded bg-black/60 backdrop-blur-md px-2 py-0.5 text-[9px] uppercase tracking-wider text-[rgb(var(--gold-rgb))] border border-white/10">
                        {t('projects.videoLabel')} #{idx + 1}
                      </span>
                    </div>
                  </button>
                )}
              </div>

              {/* Content Details */}
              <div className="flex-1 p-4 flex flex-col justify-between space-y-2">
                <h3
                  onClick={() => !isPlaying && setPlayingVideoId(video.id)}
                  className={`nss-mono text-xs font-semibold leading-relaxed transition-colors ${
                    isPlaying
                      ? 'text-[rgb(var(--gold-rgb))]'
                      : 'text-[rgb(var(--text-rgb))] group-hover:text-[rgb(var(--gold-rgb))] cursor-pointer'
                  }`}
                >
                  {videoTitle}
                </h3>

                <div className="pt-2 flex items-center justify-between text-[10px] text-[rgba(var(--text-rgb),0.45)] nss-mono border-t border-[rgba(var(--gold-rgb),0.08)]">
                  <span>{t('projects.videoReport')}</span>
                  {isPlaying ? (
                    <button
                      onClick={() => setPlayingVideoId(null)}
                      className="text-red-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>{t('projects.videoStop')} ▶</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setPlayingVideoId(video.id)}
                      className="text-[rgb(var(--gold-rgb))] group-hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>{t('projects.videoPlayInline')} ▶</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMore}
            className="nss-mono flex items-center gap-2 rounded-xl border border-[rgb(var(--gold-rgb))] bg-[rgba(var(--gold-rgb),0.08)] px-8 py-3.5 text-xs uppercase tracking-[0.16em] font-bold text-[rgb(var(--gold-rgb))] transition-all hover:bg-[rgb(var(--gold-rgb))] hover:text-[#1d1233] hover:shadow-lg hover:shadow-[rgba(var(--gold-rgb),0.25)] focus-visible:outline-none"
          >
            <span>
              {t('projects.videoLoadMore')} ({videos.length - visibleCount} {t('projects.videoRemaining')})
            </span>
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
