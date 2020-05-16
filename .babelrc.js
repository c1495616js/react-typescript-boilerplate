const isTest = String(process.env.NODE_ENV) === 'test';
const isProd = String(process.env.NODE_ENV) === 'production';

module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTest ? 'commonjs' : false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@emotion/babel-preset-css-prop',
      {
        hoist: isProd,
        sourceMap: !isProd,
        autoLabel: !isProd,
        labelFormat: '[filename]--[local]',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
