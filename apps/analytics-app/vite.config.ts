import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'analytics-app',
      filename: 'remoteEntry.js',
      exposes: {
        './analyticsModule': './src/App.tsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.2.5',
          eager: true,
          import: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.2.5',
          eager: true,
          import: false,
        },
      } as any,
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    assetsInlineLimit: 0,
  },
})
