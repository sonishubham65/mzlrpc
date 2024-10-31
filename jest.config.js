const config = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", // Adjust the path to include your source files
    "!src/**/*.d.ts", // Exclude type definition files
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],
  preset: "ts-jest",
  testEnvironment: "node",
};

module.exports = config;
