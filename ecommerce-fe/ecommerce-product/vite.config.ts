import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      federation({
        name: "products",
        filename: "remoteEntry.js",
        exposes: {
          "./Products": "./src/pages/Products.tsx",
          "./CategorySlice": "./src/store/slices/categorySlice.ts",
          "./ProductSlice": "./src/store/slices/productSlice.ts",
        },
        shared: [
          "react",
          "react-dom",
          "react-router-dom",
          "@reduxjs/toolkit",
          "react-redux",
          "react-hot-toast",
        ],
      }),
    ],
    define: {
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
    preview: {
      port: 4175,
      host: "0.0.0.0",
      strictPort: true,
    },
    server: {
      port: 4175,
      host: "0.0.0.0",
      strictPort: true,
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
