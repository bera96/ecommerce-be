// vite.config.ts
import { defineConfig } from "file:///C:/Users/ozgep/OneDrive/Masa%C3%BCst%C3%BC/micro-ecommerce/ecommerce-fe/ecommerce-product/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ozgep/OneDrive/Masa%C3%BCst%C3%BC/micro-ecommerce/ecommerce-fe/ecommerce-product/node_modules/@vitejs/plugin-react-swc/index.mjs";
import federation from "file:///C:/Users/ozgep/OneDrive/Masa%C3%BCst%C3%BC/micro-ecommerce/ecommerce-fe/ecommerce-product/node_modules/@originjs/vite-plugin-federation/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\ozgep\\OneDrive\\Masa\xFCst\xFC\\micro-ecommerce\\ecommerce-fe\\ecommerce-product";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    federation({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./Products": "./src/pages/Products.tsx",
        "./CategorySlice": "./src/store/slices/categorySlice.ts",
        "./ProductSlice": "./src/store/slices/productSlice.ts"
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "@reduxjs/toolkit",
        "react-redux",
        "react-hot-toast"
      ]
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxvemdlcFxcXFxPbmVEcml2ZVxcXFxNYXNhXHUwMEZDc3RcdTAwRkNcXFxcbWljcm8tZWNvbW1lcmNlXFxcXGVjb21tZXJjZS1mZVxcXFxlY29tbWVyY2UtcHJvZHVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcb3pnZXBcXFxcT25lRHJpdmVcXFxcTWFzYVx1MDBGQ3N0XHUwMEZDXFxcXG1pY3JvLWVjb21tZXJjZVxcXFxlY29tbWVyY2UtZmVcXFxcZWNvbW1lcmNlLXByb2R1Y3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL296Z2VwL09uZURyaXZlL01hc2ElQzMlQkNzdCVDMyVCQy9taWNyby1lY29tbWVyY2UvZWNvbW1lcmNlLWZlL2Vjb21tZXJjZS1wcm9kdWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgZmVkZXJhdGlvbiBmcm9tIFwiQG9yaWdpbmpzL3ZpdGUtcGx1Z2luLWZlZGVyYXRpb25cIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZmVkZXJhdGlvbih7XG4gICAgICBuYW1lOiBcInByb2R1Y3RzXCIsXG4gICAgICBmaWxlbmFtZTogXCJyZW1vdGVFbnRyeS5qc1wiLFxuICAgICAgZXhwb3Nlczoge1xuICAgICAgICBcIi4vUHJvZHVjdHNcIjogXCIuL3NyYy9wYWdlcy9Qcm9kdWN0cy50c3hcIixcbiAgICAgICAgXCIuL0NhdGVnb3J5U2xpY2VcIjogXCIuL3NyYy9zdG9yZS9zbGljZXMvY2F0ZWdvcnlTbGljZS50c1wiLFxuICAgICAgICBcIi4vUHJvZHVjdFNsaWNlXCI6IFwiLi9zcmMvc3RvcmUvc2xpY2VzL3Byb2R1Y3RTbGljZS50c1wiLFxuICAgICAgfSxcbiAgICAgIHNoYXJlZDogW1xuICAgICAgICBcInJlYWN0XCIsXG4gICAgICAgIFwicmVhY3QtZG9tXCIsXG4gICAgICAgIFwicmVhY3Qtcm91dGVyLWRvbVwiLFxuICAgICAgICBcIkByZWR1eGpzL3Rvb2xraXRcIixcbiAgICAgICAgXCJyZWFjdC1yZWR1eFwiLFxuICAgICAgICBcInJlYWN0LWhvdC10b2FzdFwiLFxuICAgICAgXSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBtb2R1bGVQcmVsb2FkOiBmYWxzZSxcbiAgICB0YXJnZXQ6IFwiZXNuZXh0XCIsXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeWIsU0FBUyxvQkFBb0I7QUFDdGQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsUUFDUCxjQUFjO0FBQUEsUUFDZCxtQkFBbUI7QUFBQSxRQUNuQixrQkFBa0I7QUFBQSxNQUNwQjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ047QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsSUFDZixRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
