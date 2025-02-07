import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/",
  base: "/Team_project_FE/",

  plugins: [react()],
  server: {
    open: true,
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://backend-moodie.onrender.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
