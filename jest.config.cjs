module.exports = {
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/__tests__/**/*.test.ts'],
    transform: {
        '^.+\\.(t|j)sx?$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.json',
                useESM: true,
                isolatedModules: true,
            },
        ],
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFiles: ['reflect-metadata'],
};


