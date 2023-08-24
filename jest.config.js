const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  const mongod = new MongoMemoryServer();

  const mongoUri = await mongod.getUri();

  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
      __MONGO_URI__: mongoUri,
    },
  };
};