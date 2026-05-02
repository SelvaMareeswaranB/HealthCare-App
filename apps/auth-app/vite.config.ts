import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "auth-app",
      filename: "remoteEntry.js",
      exposes: {
        "./login": "./src/Pages/LoginPage.tsx"
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.2.5'
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.2.5'
        },
        'react-router-dom': {
          singleton: true
        }
      } as any
    })
  ],
  resolve: {
    alias: {
      "@repo/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@repo/auth": path.resolve(__dirname, "../../packages/auth/src"),
      "@repo/store": path.resolve(__dirname, "../../packages/store/src"), "react": path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "react/jsx-runtime": path.resolve(__dirname, "./node_modules/react/jsx-runtime"),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})