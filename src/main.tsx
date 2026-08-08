import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import {App} from './App.tsx'

// Register the service worker; autoUpdate pulls new versions in the background.
// Long-open tabs only check for updates on navigation, so poll hourly as well.
registerSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    r && setInterval(async () => {
      if (r.installing || !navigator.onLine) return
      const resp = await fetch(swUrl, { cache: 'no-store' })
      if (resp?.status === 200) await r.update()
    }, 60 * 60 * 1000)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
