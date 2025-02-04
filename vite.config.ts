/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  server: {
    host: "0.0.0.0", // Bind to all network interfaces
    port: 5164, // Use the desired port
    strictPort: true, // Fail if the port is unavailable
  },
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/test/setup.ts",
    exclude: ["tests/**", "tests-examples/**", "node_modules/**"],
  },
});
