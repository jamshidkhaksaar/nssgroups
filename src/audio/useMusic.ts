import { createContext, useContext } from 'react'

export interface Track {
  id: string
  title: string
  url: string
}

export const PLAYLIST: Track[] = [
  { id: 't1', title: 'Welcome to NSS Group', url: './background musics/Welcome to NSS Group.mp3' },
  { id: 't2', title: 'Güneşin Altında', url: `./background musics/${encodeURIComponent('Gunesin Altunda.mp3')}` },
  { id: 't3', title: 'Güneşin Altında II', url: `./background musics/${encodeURIComponent('Güneşin Altında2.mp3')}` },
  { id: 't4', title: 'Kırmızı Kedi', url: `./background musics/${encodeURIComponent('Kırmızı Kedi.mp3')}` },
  { id: 't5', title: 'Kırmızı Kedi II', url: `./background musics/${encodeURIComponent('Kırmızı Kedi2.mp3')}` },
  { id: 't6', title: 'Kırmızı Kedi III', url: `./background musics/${encodeURIComponent('Kırmızı Kedi3.mp3')}` },
  { id: 't7', title: 'Kırmızı Kedi IV', url: `./background musics/${encodeURIComponent('Kırmızı Kedi4.mp3')}` },
  { id: 't8', title: 'Velvet Ledger', url: `./background musics/${encodeURIComponent('Velvet Ledger.mp3')}` },
]

export interface MusicContextType {
  isPlaying: boolean
  toggleMusic: () => void
  playlist: Track[]
  currentTrackIndex: number
  currentTrack: Track
  nextTrack: () => void
  prevTrack: () => void
  selectTrack: (index: number) => void
}

export const MusicContext = createContext<MusicContextType | null>(null)

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}
