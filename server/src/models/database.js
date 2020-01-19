const Sequelize = require('sequelize');
const models = require('./index');

require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_520_ci',
    },
  },
);

(async () => {
  try {
    await sequelize.authenticate();
    Object.keys(models).forEach(key => {
      if (models[key].associate) {
        models[key].associate(models);
      }
    });
    sequelize.sync();
    console.log('Connected to the database');
  } catch (error) {
    console.log('Database connection error', error);
  }
})();

module.exports = sequelize;
