/* eslint-disable global-require */
module.exports = {
  plugins: () => [
    // postcss 的插件
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('postcss-preset-env'),
  ],
};