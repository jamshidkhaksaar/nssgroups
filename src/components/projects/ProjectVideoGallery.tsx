import { useState } from 'react'
import { Play, Video, X, ChevronDown } from 'lucide-react'
import { useI18n } from '@/i18n/i18n'
import type { ProjectVideo } from '@/data/projectsData'

interface ProjectVideoGalleryProps {
  videos: ProjectVideo[]
}

const INITIAL_COUNT = 16 // 4 columns x 4 rows = 16 videos initially

export default function ProjectVideoGallery({ videos }: ProjectVideoGalleryProps) {
  const { t } = useI18n()
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [activeVideo, setActiveVideo] = useState<ProjectVideo | null>(null)

  const visibleVideos = videos.slice(0, visibleCount)
  const hasMore = visibleCount < videos.length

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, videos.length))
  }

  return (
    <div className="space-y-6">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="h-5 w-5 text-[rgb(var(--gold-rgb))]" />
          <h2 className="nss-display text-2xl tracking-wide text-[rgb(var(--text-rgb))]">
            Project Operations & Video Reports
          </h2>
        </div>
        <span className="nss-mono text-xs text-[rgba(var(--text-rgb),0.5)]">
          Showing {visibleVideos.length} of {videos.length} Videos
        </span>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visibleVideos.map((video, idx) => {
          const videoTitle = t(video.titleKey)
          return (
            <article
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-[rgba(var(--gold-rgb),0.16)] bg-[var(--panel)] cursor-pointer transition-all duration-300 hover:border-[rgb(var(--gold-rgb))] hover:-translate-y-1 hover:shadow-xl hover:shadow-[rgba(var(--gold-rgb),0.1)]"
            >
              {/* Thumbnail Poster Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/80">
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
                    Video #{idx + 1}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="flex-1 p-4 flex flex-col justify-between space-y-2">
                <h3 className="nss-mono text-xs font-semibold text-[rgb(var(--text-rgb))] line-clamp-2 leading-relaxed group-hover:text-[rgb(var(--gold-rgb))] transition-colors">
                  {videoTitle}
                </h3>
                <div className="pt-2 flex items-center justify-between text-[10px] text-[rgba(var(--text-rgb),0.45)] nss-mono border-t border-[rgba(var(--gold-rgb),0.08)]">
                  <span>NSS Logistics Report</span>
                  <span className="text-[rgb(var(--gold-rgb))] group-hover:underline">Click to Play ▶</span>
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
            <span>Load More Project Videos ({videos.length - visibleCount} Remaining)</span>
            <ChevronDown size={16} />
          </button>
        </div>
      )}

      {/* Video Modal Player (Plays on Click) */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[rgba(var(--gold-rgb),0.3)] bg-slate-950 shadow-2xl shadow-black/80">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[rgba(var(--gold-rgb),0.15)] px-6 py-4 bg-slate-900/80">
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <Video size={18} className="text-[rgb(var(--gold-rgb))] shrink-0" />
                <h3 className="nss-mono text-sm font-bold text-white truncate">
                  {t(activeVideo.titleKey)}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close Video Player"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Element (Plays when modal opens) */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeVideo.src}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>

            {/* Video Description Footer */}
            <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between text-xs text-[rgba(var(--text-rgb),0.6)]">
              <span className="nss-mono">Official NSS Group Project Field Video</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="nss-mono text-[11px] text-[rgb(var(--gold-rgb))] hover:underline"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
