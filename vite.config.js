import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://shopping-website-server.onrender.com",
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, ""),   // 꼭 포함!
      },
    },
  },
});