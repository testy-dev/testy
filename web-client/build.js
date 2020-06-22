/* eslint-disable @typescript-eslint/no-var-requires */

const { build } = require("esbuild");
require("dotenv").config();

const define = {
  "process.env.NODE_ENV": '"production"',
};

for (const k in process.env) {
  define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}

const options = {
  stdio: "inherit",
  entryPoints: ["./src/index.tsx"],
  outfile: "./dist/index.js",
  bundle: true,
  minify: true,
  sourcemap: true,
  errorLimit: 100,
  define,
};

build(options).catch(() => process.exit(1));
