import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      federation({
        name: "auth",
        filename: "remoteEntry.js",
        exposes: {
          "./Login": "./src/pages/Login.tsx",
          "./Signup": "./src/pages/Signup.tsx",
          "./LoginSlice": "./src/store/reducer.ts",
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
      port: 4173,
      host: "0.0.0.0",
      strictPort: true,
    },
    server: {
      port: 4173,
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
