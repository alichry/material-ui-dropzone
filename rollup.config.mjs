import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-cpy';
import external from 'rollup-plugin-peer-deps-external';
//import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
/*
^^^^^^
npm ERR! While resolving: material-ui-dropzone@3.5.0
npm ERR! Found: rollup@4.16.2
npm ERR! node_modules/rollup
npm ERR!   dev rollup@"^4.16.2" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer rollup@"^2.0.0" from rollup-plugin-size-snapshot@0.12.0
npm ERR! node_modules/rollup-plugin-size-snapshot
npm ERR!   dev rollup-plugin-size-snapshot@"*" from the root project
*/
import { readFileSync } from 'fs';
// import pkg from './package.json';
// const pkg = await import("./package.json");
const pkgJson = readFileSync('./package.json');
const pkg = JSON.parse(pkgJson);

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external({
      includeDependencies: true,
    }),
    babel({
      exclude: /node_modules/,
      // We are using @babel/plugin-transform-runtime
      //runtimeHelpers: true,
      babelHelpers: 'runtime'
    }),
    copy({
      files: ['src/index.d.ts'],
      dest: 'dist',
    }),
    resolve(),
    commonjs(),
    //sizeSnapshot(),
  ],
};
