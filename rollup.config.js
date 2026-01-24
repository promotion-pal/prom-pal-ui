import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";

const uiConfig = {
  input: "src/components/index.ts",
  external: ["react", "react-dom", "react-hook-form"],
  output: [
    { dir: "build/components/cjs", format: "cjs", exports: "named" },
    { dir: "build/components/esm", format: "esm" },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      extensions: [".css"],
      inject: true,
      extract: false,
      modules: false,
      config: {
        path: "./postcss.config.js",
      },
    }),
  ],
};

const functionConfig = {
  input: "src/function/index.ts",
  external: ["react", "react-dom", "react-hook-form"],
  output: [
    { dir: "build/function/cjs", format: "cjs", exports: "named" },
    { dir: "build/function/esm", format: "esm" },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
};

export default [uiConfig, functionConfig];
