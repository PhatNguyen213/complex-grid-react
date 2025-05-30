const config = {
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 70,
    },
  },
};

export default config;
