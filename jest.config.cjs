module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
