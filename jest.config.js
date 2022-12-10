module.exports = {
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src',
  },
};
