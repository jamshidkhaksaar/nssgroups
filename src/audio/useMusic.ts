import { createContext, useContext } from 'react'

export interface Track {
  id: string
  title: string
  url: string
}

export const PLAYLIST: Track[] = [
  { id: 't1', title: 'Welcome to NSS Group (Theme)', url: './background musics/Welcome to NSS Group.mp3' },
  { id: 't2', title: 'Welcome to NSS Group Part 1', url: './background musics/Welcome to NSS Group (1).mp3' },
  { id: 't3', title: 'Welcome to NSS Group Part 2', url: './background musics/Welcome to NSS Group (2).mp3' },
  { id: 't4', title: 'Welcome to NSS Group Part 3', url: './background musics/Welcome to NSS Group (3).mp3' },
  { id: 't5', title: 'Velvet Ledger', url: './background musics/Velvet Ledger.mp3' },
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
