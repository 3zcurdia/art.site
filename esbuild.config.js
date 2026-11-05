import build from "./config/esbuild.defaults.js"

// Tailwind CSS is the only frontend entrypoint: it is compiled by
// @tailwindcss/postcss (see postcss.config.js) and fingerprint-stamped
// into output/_bridgetown/static.
//
// The layout references it with `asset_path :css`.

/**
 * @typedef { import("esbuild").BuildOptions } BuildOptions
 * @type {BuildOptions}
 */
const esbuildOptions = {
  entryPoints: ["./frontend/styles/index.css"],
  plugins: [
    // add new plugins here...
  ],
  globOptions: {
    excludeFilter: /\.(dsd|lit)\.css$/
  }
}

build(esbuildOptions)
