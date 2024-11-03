module.exports = {
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|formik|yup|js-cookie|react-hot-toast|postcss-prefix-selector)/)",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|jpg|jpeg|png|gif|svg)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
