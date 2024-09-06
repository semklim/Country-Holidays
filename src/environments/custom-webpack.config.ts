/* eslint-disable import/no-extraneous-dependencies */
import Dotenv from 'dotenv-webpack';

module.exports = {
  output: {
    crossOriginLoading: 'anonymous',
  },
  plugins: [new Dotenv()],
};
