// rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/browser.ts",
  output: {
    dir: "dist",
    format: "iife",
  },
  plugins: [
    typescript(),
    commonjs({include: "./node_modules"}),
    resolve(),
  ],
};
