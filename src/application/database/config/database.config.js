require('dotenv').config();
require('ts-node/register');

const { databaseConfig } = require('./database.config.ts');

const config = databaseConfig();

// Sequelize CLI expects a specific format with environment-based configs
module.exports = {
  development: config,
  production: config,
  test: config,
};
