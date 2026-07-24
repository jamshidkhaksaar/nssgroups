import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { I18nProvider } from '@/i18n/I18nContext'
import { ThemeProvider } from '@/theme/ThemeContext'
import { MusicProvider } from '@/audio/MusicContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <I18nProvider>
          <MusicProvider>
            <App />
          </MusicProvider>
        </I18nProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
