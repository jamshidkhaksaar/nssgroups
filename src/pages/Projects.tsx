import PageHeader from '@/components/PageHeader'
import AnimatedNumber from '@/components/AnimatedNumber'
import Reveal from '@/components/Reveal'
import ProjectImageSlider from '@/components/projects/ProjectImageSlider'
import ProjectVideoGallery from '@/components/projects/ProjectVideoGallery'
import { FEATURED_PROJECT_VIDEOS, PROJECT_IMAGES, PROJECT_VIDEOS } from '@/data/projectsData'

export default function Projects() {
  return (
    <main className="bg-[var(--bg)] min-h-screen text-[rgb(var(--text-rgb))]">
      {/* Header */}
      <PageHeader tagKey="projects.tag" headingKey="projects.heading" subKey="projects.sub" />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
        {/* Project Impact Stats */}
        <Reveal className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-[rgba(var(--gold-rgb),0.15)] py-8">
          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-baseline gap-1">
              <AnimatedNumber value={180} className="nss-display text-4xl sm:text-5xl text-[rgb(var(--gold-rgb))]" />
              <span className="nss-display text-2xl text-[rgb(var(--gold-rgb))]">+</span>
            </div>
            <p className="nss-mono text-xs tracking-[0.14em] text-[rgba(var(--text-rgb),0.55)] uppercase">
              Completed High-Scale Projects
            </p>
          </div>

          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-baseline gap-1">
              <AnimatedNumber value={21} className="nss-display text-4xl sm:text-5xl text-[rgb(var(--gold-rgb))]" />
            </div>
            <p className="nss-mono text-xs tracking-[0.14em] text-[rgba(var(--text-rgb),0.55)] uppercase">
              Active Project Activity Photo Galleries
            </p>
          </div>

          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-baseline gap-1">
              <AnimatedNumber value={25} className="nss-display text-4xl sm:text-5xl text-[rgb(var(--gold-rgb))]" />
            </div>
            <p className="nss-mono text-xs tracking-[0.14em] text-[rgba(var(--text-rgb),0.55)] uppercase">
              Official Project Operation Field Videos
            </p>
          </div>
        </Reveal>

        {/* Latest field footage — kept outside Reveal because the tall mobile grid must remain visible. */}
        <ProjectVideoGallery
          videos={FEATURED_PROJECT_VIDEOS}
          headingKey="projects.featured.heading"
          descriptionKey="projects.featured.sub"
          featured
          initialCount={FEATURED_PROJECT_VIDEOS.length}
        />

        {/* 1. Project Activity Image Slider */}
        <Reveal>
          <ProjectImageSlider images={PROJECT_IMAGES} />
        </Reveal>

        {/* 2. Project Video Gallery (4 Columns, 4 Rows initially = 16, Load More button) */}
        <ProjectVideoGallery videos={PROJECT_VIDEOS} />
      </section>
    </main>
  )
}
