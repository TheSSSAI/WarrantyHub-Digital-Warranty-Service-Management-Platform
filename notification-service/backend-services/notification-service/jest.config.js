module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/main.ts',
    '!**/modules/**',
    '!**/*.module.ts',
    '!**/*.interface.ts',
    '!**/*.dto.ts',
    '!**/*.schema.ts',
    '!**/*.entity.ts',
    '!**/*.config.ts'
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/core/$1',
    '^@application/(.*)$': '<rootDir>/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/presentation/$1',
    '^@config/(.*)$': '<rootDir>/config/$1'
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};