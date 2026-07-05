import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react()],
  publicDir: false,
  build: {
    cssCodeSplit: false,
    emptyOutDir: false,
    lib: {
      entry: "app/static-entry.tsx",
      formats: ["es"],
    },
    outDir: "docs",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => (assetInfo.name?.endsWith(".css") ? "assets/app.css" : "assets/[name][extname]"),
        entryFileNames: "assets/app.js",
      },
    },
  },
});
