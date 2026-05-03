import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from "@originjs/vite-plugin-federation";

function preconnectFederationRemotes(env: Record<string, string>): Plugin {
  const keys = [
    'VITE_AUTH_REMOTE_URL',
    'VITE_PATIENT_REMOTE_URL',
    'VITE_DASHBOARD_REMOTE_URL',
    'VITE_ANALYTICS_REMOTE_URL',
  ]
  const origins = [
    ...new Set(
      keys
        .map((k) => env[k])
        .filter(Boolean)
        .map((url) => {
          try {
            return new URL(url as string).origin
          } catch {
            return null
          }
        })
        .filter((o): o is string => o != null)
    ),
  ]

  return {
    name: 'preconnect-federation-remotes',
    transformIndexHtml(html) {
      if (origins.length === 0) return html
      const tags = origins
        .map(
          (o) => `    <link rel="preconnect" href="${o}" crossorigin />`
        )
        .join('\n')
      return html.replace('<head>', `<head>\n${tags}`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      preconnectFederationRemotes(env),
      react(),
      tailwindcss(),
      federation({
        name: "shell-app",
        remotes: {
          authRemote: env.VITE_AUTH_REMOTE_URL,
          patientRemote: env.VITE_PATIENT_REMOTE_URL,
          dashboardRemote: env.VITE_DASHBOARD_REMOTE_URL,
          analyticsRemote: env.VITE_ANALYTICS_REMOTE_URL,
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