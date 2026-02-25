/// <reference types='vitest' />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import * as path from "path";

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: "../../node_modules/.vite/libs/photoService",
  resolve: {
    alias: {
      "@tdorsey/models": path.resolve(
        __dirname,
        "../../libs/shared/models/src/index.ts"
      ),
      "@tdorsey/pexels": path.resolve(__dirname, "../../libs/pexels/src/index.ts"),
    },
  },
  plugins: [
    dts({
      entryRoot: "src",
      tsconfigPath: path.join(import.meta.dirname, "tsconfig.lib.json"),
    }),
  ],
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: {
        index: "src/index.ts",
      },
      name: "@tdorsey/photo-service",
      fileName: (format, entryName) => `${entryName}.js`,
      formats: ["es" as const],
    },
    rollupOptions: {
      external: [],
    },
  },
  test: {
    name: "@tdorsey/photo-service",
    watch: false,
    globals: true,
    environment: "node",
    include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "./test-output/vitest/coverage",
      provider: "v8" as const,
    },
  },
}));
