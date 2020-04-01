// rollup.config.js
// import commonjs from "@rollup/plugin-commonjs";
// import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/browser.ts",
  output: {
    dir: "build",
    format: "iife",
  },
  plugins: [
    // resolve(),
    // commonjs(),
    typescript(),
  ],
};
