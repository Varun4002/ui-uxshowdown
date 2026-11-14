import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Ports are pinned with strictPort on purpose. This machine runs several Vite
// projects that all default to 5173/5174, and when that port was taken the
// server silently hopped to the next one — two instances of this app have been
// observed running at once, one serving a stale module graph, which looks to the
// user exactly like "the website is broken". Fail loudly instead.
export default defineConfig({
  plugins: [react()],
  server: { port: 5178, strictPort: true },
  preview: { port: 4178, strictPort: true },
})
