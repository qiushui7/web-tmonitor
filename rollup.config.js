/* eslint-disable no-undef */
const resolve = require("@rollup/plugin-node-resolve")
const commonjs =  require("@rollup/plugin-commonjs")
const json = require("@rollup/plugin-json")
const { uglify } =  require("rollup-plugin-uglify")
const fs = require("fs")
const path = require("path");
const packagesDir = path.resolve(__dirname, 'packages');
const packageFiles = fs.readdirSync(packagesDir);
function output(path) {
    return [
        {
            input: [`./packages/${path}/src/index.js`],
            output: [
                {
                    file: `./packages/${path}/dist/index.cjs.js`,
                    format: 'cjs',
                    sourcemap: true,
                },
                {
                    file: `./packages/${path}/dist/index.esm.js`,
                    format: 'esm',
                    sourcemap: true,
                },
                {
                    file: `./packages/${path}/dist/index.js`,
                    format: 'umd',
                    name: 'web-see',
                    sourcemap: true,
                },
                {
                    file: `./packages/${path}/dist/index.min.js`,
                    format: 'umd',
                    name: 'web-see',
                    sourcemap: true,
                    plugins: [uglify()],
                },
            ],
            plugins: [
                resolve(),
                commonjs(),
                json(),
            ],
        },
    ];
}

module.exports = [...packageFiles.map(path => output(path)).flat()];
