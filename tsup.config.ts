import { defineConfig } from "tsup";
import pluginBabel from "@rollup/plugin-babel";

export default defineConfig({
  entry: ["src/lib/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  loader: {
    ".css": "local-css", // Enable CSS Modules
  },
  plugins: [
    pluginBabel({
      babelHelpers: "bundled",
      parserOpts: {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
      },
      plugins: ["babel-plugin-react-compiler"], // Add the compiler here
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      // Ensure Babel does not transform modules, let tsup/esbuild handle that
      presets: [["@babel/preset-env", { modules: false }]],
    }),
  ],
});
