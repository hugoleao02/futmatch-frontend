import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11", "edge >= 79"],
    }),
  ],
  build: {
    target: ["es2015", "edge88", "firefox78", "chrome87", "safari14"],
  },
  server: {
    cors: true,
    port: 3000,
  },
});
