/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/*.e2e-spec.ts", "<rootDir>/**/*.{spec,test}.ts"],
};
