import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Keeping your Tailwind setup
import { VitePWA } from 'vite-plugin-pwa' // The new PWA plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Keeping your Tailwind plugin
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      // This allows you to test the Install button in 'npm run dev' mode
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'E-Cell UPC',
        short_name: 'E-Cell',
        description: 'Official App of Entrepreneurship Cell UPC',
        theme_color: '#0F172A',
        background_color: '#0F172A',
        display: 'standalone',
        // IMPORTANT: These match your GitHub Pages repository name
        start_url: '/ecellupc/',
        scope: '/ecellupc/',
        icons: [
          {
            src: 'pwa-192x192.png', // Ensure this file is in your 'public' folder
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Ensure this file is in your 'public' folder
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: "/ecellupc/",  // <--- Kept this critical line!
})