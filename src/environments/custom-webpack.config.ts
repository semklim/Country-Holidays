/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const Dotenv = require('dotenv-webpack');

module.exports = {
  output: {
    crossOriginLoading: 'anonymous',
  },
  plugins: [new Dotenv()],
};
