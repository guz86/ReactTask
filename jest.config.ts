export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  // rootDir: 'src/components',
  rootDir: 'src',
  verbose: true,
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__ mocks __/fileMock.js',
    '^@app/(.*)$': '<rootDir>/$1',
    '\\.(css)$': 'identity-obj-proxy',
  },
  // collectCoverageFrom: [
  //   '**/*.{ts,tsx}',
  //   '!main.tsx',
  //   '!**/hooks/**',
  //   '!**/components/**',
  // ],
};
