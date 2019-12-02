const dotenv = require('dotenv').config();
module.exports = {
  "development": {
    "username": "postgres",
    "password": "data123",
    "database": "DB_WinterShop",
    "host": "localhost",
    "dialect": "postgres",
  },
  "test": {
    "username": "postgres",
    "password": "data123",
    "database": "DB_WinterShop",
    "host": "localhost",
    "dialect": "postgres",
  },
  "production": {
    "username": "postgres",
    "password": "data123",
    "database": "DB_WinterShop",
    "host": "localhost",
    "dialect": "postgres",
  }
};
