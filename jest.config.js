/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/src/**/*.test.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/index.ts", "!src/startServer.ts"],
  resolver: "jest-ts-webcompat-resolver",
};
