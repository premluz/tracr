import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: [
      // @/ maps to ds/src — satisfies all ds-internal @/ imports
      { find: "@", replacement: path.resolve(__dirname, "../../packages/ds/src") },
      // Force SidebarNav to use the TSX source instead of the stale compiled JS
      {
        find: "@/components/custom/sidebar-nav",
        replacement: path.resolve(
          __dirname,
          "../../packages/ds/src/components/custom/sidebar-nav.tsx",
        ),
      },
    ],
  },
})
