import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "shell-app",
        remotes: {
          authRemote: env.VITE_AUTH_REMOTE_URL || "http://localhost:5174/assets/remoteEntry.js",
          patientRemote: env.VITE_PATIENT_REMOTE_URL || "http://localhost:5176/assets/remoteEntry.js",
          dashboardRemote: env.VITE_DASHBOARD_REMOTE_URL || "http://localhost:5175/assets/remoteEntry.js",
          analyticsRemote: env.VITE_ANALYTICS_REMOTE_URL || "http://localhost:5177/assets/remoteEntry.js",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: '^19.2.5',
            eager: true,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^19.2.5',
            eager: true,
          }, 'react-router-dom': { singleton: true },
          '@repo/store': { singleton: true },
          'zustand': { singleton: true },
          '@repo/auth': { singleton: true }
        } as any
      }),
    ],
    build: {
      modulePreload: false,
      target: 'esnext', // Required for Top-level await in Module Federation
      minify: false,
      cssCodeSplit: false,
      assetsInlineLimit: 0,
    },
  }
})