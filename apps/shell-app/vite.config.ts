import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from "@originjs/vite-plugin-federation";

function uniquePreserveOrder<T>(values: T[]): T[] {
  const seen = new Set<T>()
  const out: T[] = []
  for (const v of values) {
    if (seen.has(v)) continue
    seen.add(v)
    out.push(v)
  }
  return out
}

/** Early hints so cross-origin remoteEntry.js is fetched before the main bundle runs (reduces “Failed to fetch dynamically imported module”). */
function federationRemoteHints(env: Record<string, string>): Plugin {
  const keys = [
    'VITE_DASHBOARD_REMOTE_URL',
    'VITE_AUTH_REMOTE_URL',
    'VITE_ANALYTICS_REMOTE_URL',
    'VITE_PATIENT_REMOTE_URL',
  ]
  const remoteEntryUrls = uniquePreserveOrder(
    keys.map((k) => env[k]).filter(Boolean) as string[]
  )
  const origins = uniquePreserveOrder(
    remoteEntryUrls
      .map((u) => {
        try {
          return new URL(u).origin
        } catch {
          return null
        }
      })
      .filter((o): o is string => o != null)
  )

  return {
    name: 'federation-remote-hints',
    transformIndexHtml(html) {
      if (remoteEntryUrls.length === 0) return html
      const lines: string[] = []
      for (const o of origins) {
        lines.push(`    <link rel="dns-prefetch" href="${o}" />`)
      }
      for (const o of origins) {
        lines.push(`    <link rel="preconnect" href="${o}" crossorigin />`)
      }
      for (const u of remoteEntryUrls) {
        lines.push(
          `    <link rel="modulepreload" href="${u}" crossorigin />`
        )
      }
      return html.replace('<head>', `<head>\n${lines.join('\n')}`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      federationRemoteHints(env),
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