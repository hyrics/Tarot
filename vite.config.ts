import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy"; // 1. 引入插件

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    // 2. 添加 legacy 插件支持旧版浏览器
    legacy({
      targets: ["defaults", "not IE 11", "Android >= 6", "iOS >= 10"],
    }),
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  // 3. 建议显式指定 base 路径，确保部署后的资源引用正确
  base: "/", 
});