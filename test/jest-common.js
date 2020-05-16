// common project configuration used by the other configs

const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../src'),
    'shared',
    __dirname,
  ],
  testPathIgnorePatterns: ['<rootDir>/server/'],
  moduleNameMapper: {
    // module must come first
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.s?css$': require.resolve('./style-mock.js'),
    '^@/(.*)$': '<rootDir>/src/$1',
    // can also map files that are loaded by webpack with the file-loader
  },
  preset: 'ts-jest',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
};
