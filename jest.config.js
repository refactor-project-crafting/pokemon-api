/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/src/**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/server/startServer.ts",
    "!src/trainer/**/*.ts",
  ],
  resolver: "jest-ts-webcompat-resolver",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
};
