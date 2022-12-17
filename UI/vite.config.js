import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    outDir:"built",
  },
  plugins: [react(),
    VitePWA({ registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'favicon.png'],
    injectRegister: 'auto',
    devOptions:{enabled:true},
    manifest: {
      name: 'Dynamite',
      short_name: 'Dynamite',
      description: 'Machine learning model app',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'favicon.png',
          sizes: '180x180',
          type: 'image/png'
        }
      ]
    }
  })
  ],
})