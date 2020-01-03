'use strict';
const bcrypt = require('bcryptjs');
const saltRound = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    block: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    DoB: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING
  }, {
    freezeTableName: true
  });

  User.register = async function (data, redirect) {
    bcrypt.hash(data.pwd, saltRound, function(err, hash) {
      User.create({
        username: data.usr,
        password: hash,
        block: false,
        name: data.name,
        DoB: data.DoB,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
      }).then(user => redirect(null, user))
        .catch(err => redirect(err, null))
    });
  };

  User.prototype.validPassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, res) => {
      return done(err, res);
    });
  };

  User.associate = function (models) {
  };
  
  return User;
};
