export default {
  setupFilesAfterEnv: ['<rootDir>/tests/setupSailsTest.js'],
  testTimeout: 20000, // aumenta o tempo para o lift do Sails completar
  testEnvironment: 'node',
  transform: {},
};
