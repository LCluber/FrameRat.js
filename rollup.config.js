import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

module.exports = {
  input: 'build/player.js',
  output: {
    name: 'FrameRat',
    file: 'build/framerat.js',
    format: 'esm'
  },
  external: [
    '@lcluber/mouettejs',
    '@lcluber/taipanjs',
    '@lcluber/type6js',
    '@lcluber/chjs'
  ],
  plugins: [
    resolve({
      mainFields: ['main'],
      extensions: ['.js'],
      modulesOnly: true
    })
  ]
};
