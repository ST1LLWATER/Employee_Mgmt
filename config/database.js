const Sequelize = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to true to see Sequelize queries in the console
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database!');
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (err) {
    console.error('Error connecting to MySQL database:', err);
  }
})();

module.exports = sequelize;
