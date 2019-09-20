import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

module.exports = {
  input: "build/framerat.js",
  output: {
    name: "FrameRat",
    file: "build/framerat.iife.js",
    format: "iife"
  },
  plugins: [
    resolve({
      mainFields: ['main'], 
      extensions: [ '.js'],
      modulesOnly: true
    }),
    babel({
      // exclude: "node_modules/**" // only transpile our source code
    })
  ]
};
