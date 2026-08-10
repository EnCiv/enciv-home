module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest-test-setup.js'],
  preset: '@shelf/jest-mongodb',
  moduleNameMapper: {
    '^ws$': '<rootDir>/node_modules/ws/index.js',
  },
  // civil-server/civil-client/civil-pursuit and their ESM-only transitive deps must be transformed
  transformIgnorePatterns: [
    '/node_modules/(?!(civil-server|civil-client|civil-pursuit|color|color-string|color-convert|color-name|bson)/)',
  ],
  // @shelf/jest-mongodb@6 defaults to @swc/jest without JSX; enable JSX explicitly
  transform: {
    '^.+\\.m?[jt]sx?$': ['@swc/jest', { jsc: { parser: { syntax: 'ecmascript', jsx: true } } }],
  },
}
