module.exports = {
  "development": {
    "username": "postgres",
    "password": "data123",
    "database": "DB_WinterShop",
    "host": "localhost",
    "dialect": "postgres",
    "port": 5432
  },
  "test": {
    "username": "postgres",
    "password": "data123",
    "database": "DB_WinterShop",
    "host": "localhost",
    "dialect": "postgres",
    "port": 5432
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "port": process.env.DB_PORT
  }
};
