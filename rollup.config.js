import babel from "rollup-plugin-babel";

module.exports = {
  input: "build/framerat.js",
  output: {
    name: "FrameRat",
    file: "build/framerat.iife.js",
    format: "iife"
  },
  plugins: [
    babel({
      exclude: "node_modules/**" // only transpile our source code
    })
  ]
};
