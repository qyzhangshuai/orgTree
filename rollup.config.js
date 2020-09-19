/**
 * @description: 
 * @author: zs
 * @Date: 2020-09-18 17:29:25
 * @LastEditTime: 2020-09-19 11:27:21
 * @LastEditors: zs
 */
// resolve将我们编写的源码与依赖的第三方库进行合并
import resolve from 'rollup-plugin-node-resolve';
// 解决rollup.js无法识别CommonJS模块
import commonjs from 'rollup-plugin-commonjs';
// babel插件用于处理es6代码的转换，使转换出来的代码可以用于不支持es6的环境使用
import babel from "rollup-plugin-babel";
import typescript from 'rollup-plugin-typescript2';
// 使rollup可以使用postCss处理样式文件less、css等
import postcss from 'rollup-plugin-postcss'
import { DEFAULT_EXTENSIONS } from '@babel/core';
import autoprefixer from 'autoprefixer';
// 压缩打包代码
import { terser } from 'rollup-plugin-terser';
// css代码压缩
import cssnano from 'cssnano';
// 处理less嵌套样式写法
import nested from 'postcss-nested';
// 可以提前适用最新css特性（已废弃由postcss-preset-env替代）
// import cssnext from 'postcss-cssnext';
// 替代cssnext
import postcssPresetEnv from 'postcss-preset-env';

const env = process.env.NODE_ENV;

export default {
    input: ['src/index.tsx'],
    output: [
        {
            dir: 'lib',
            format: 'cjs',
            chunkFileNames: '[name].js',
            minifyInternalExports: false,
        },
        {
            dir: 'es',
            format: 'esm',
            chunkFileNames: '[name].js',
            minifyInternalExports: false,
        },
    ],
    external: [
        'react',
        'react-dom',
    ],
    plugins: [
        postcss({
            // extract: '[name].css', // 是否
            plugins: [
                nested(),
                // cssnext({ warnForDuplicates: false, }),
                postcssPresetEnv(),
                cssnano(),
                autoprefixer()
            ],
            // 处理.css和.less文件
            extensions: ['.css', 'less'],
        }),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: "tsconfig.json",
        }),
        babel({
            exclude: 'node_modules/**', // 防止打包node_modules下的文件
            runtimeHelpers: true,       // 使plugin-transform-runtime生效
            extensions: [
                ...DEFAULT_EXTENSIONS,
                '.ts',
                '.tsx'
            ],
        }),
        // 生产环境执行terser压缩代码
        (env === 'production' && terser()),
    ].filter(Boolean)
};