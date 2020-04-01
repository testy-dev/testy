// rollup.config.js
// import commonjs from "@rollup/plugin-commonjs";
// import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    dir: "build",
    format: "cjs",
  },
  plugins: [
    // resolve(),
    // commonjs(),
    typescript(),
  ],
};
