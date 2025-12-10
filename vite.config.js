import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
// Get __dirname in ESM
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
