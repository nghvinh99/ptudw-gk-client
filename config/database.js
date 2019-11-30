const sequelize = require('sequelize');

const db = new sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  },
  define: {
    freezeTableName: true
  }
});

db.authenticate()
.then(() => console.log("Database connected"))
.catch(err => console.log(err));

// User.create({
//   username: 'abc',
//   password: '123'
// });

module.exports = db;
// const { Pool, client } = require('pg');

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
// });

// pool.connect(function(err, client, done){
//   if (err) {
//     return console.log('error fetching data');
//   } else {
//     return console.log ('Database connected');
//   }
// })

// module.exports = pool;