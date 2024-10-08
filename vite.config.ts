import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vsharp from "vite-plugin-vsharp";
import webFontDownload from "vite-plugin-webfont-dl";

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    webFontDownload([
      "https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap",
      "https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap",
      "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100..700&display=swap",
    ]),
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
