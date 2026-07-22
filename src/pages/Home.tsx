import Hero from '../hero/Hero'
import TrustBar from '@/sections/home/TrustBar'
import GroupDivisions from '@/sections/home/GroupDivisions'
import ImpactStats from '@/sections/home/ImpactStats'
import ServicesPreview from '@/sections/home/ServicesPreview'
import CorridorTeaser from '@/sections/home/CorridorTeaser'
import ClientsStrip from '@/sections/home/ClientsStrip'

export default function Home() {
  return (
    <main className="bg-[var(--bg)]">
      <Hero />
      <TrustBar />
      <GroupDivisions />
      <ImpactStats />
      <ServicesPreview />
      <CorridorTeaser />
      <ClientsStrip />
    </main>
  )
}
