import path from "path";
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vsharp from "vite-plugin-vsharp";
import webFontDownload from "vite-plugin-webfont-dl";

import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    react(),
    webFontDownload(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      symbolId: "icon-[dir]-[name]",
      inject: "body-last",
      customDomId: "__svg__icons__dom__",
    }),
    vsharp(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
