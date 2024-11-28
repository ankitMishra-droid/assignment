module.exports = {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'mysql',
    },
    test: {
      username: process.env.DB_USERNAME || 'your_username',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'your_test_database',
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'mysql',
    },
  };
  