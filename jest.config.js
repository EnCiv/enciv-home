module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest-test-setup.js'],
  moduleNameMapper: {
    '^ws$': '<rootDir>/node_modules/ws/index.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!(civil-pursuit|civil-client)/)'],
}
