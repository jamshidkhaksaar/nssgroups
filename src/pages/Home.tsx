import TopHero from '@/sections/home/TopHero'
import TrustBenefitsStrip from '@/sections/home/TrustBenefitsStrip'
import ProductCategoryGrid from '@/sections/home/ProductCategoryGrid'
import LogisticsServiceGrid from '@/sections/home/LogisticsServiceGrid'
import TopStatsStrip from '@/sections/home/TopStatsStrip'
import GroupDivisions from '@/sections/home/GroupDivisions'
import ServicesPreview from '@/sections/home/ServicesPreview'
import CorridorTeaser from '@/sections/home/CorridorTeaser'
import ClientsStrip from '@/sections/home/ClientsStrip'

export default function Home() {
  return (
    <main className="bg-[var(--bg)]">
      {/* Redesigned Landing Page Top Section */}
      <TopHero />
      <TrustBenefitsStrip />
      <ProductCategoryGrid />
      <LogisticsServiceGrid />
      <TopStatsStrip />

      {/* Remaining Landing Page Sections */}
      <GroupDivisions />
      <ServicesPreview />
      <CorridorTeaser />
      <ClientsStrip />
    </main>
  )
}
