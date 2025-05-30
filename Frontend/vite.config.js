import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // 👈 this tells Vite to fallback to index.html for unknown routes
  },
});
