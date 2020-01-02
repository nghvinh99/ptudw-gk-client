'use strict';
const bcrypt = require('bcryptjs');
const saltRound = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    block: DataTypes.BOOLEAN,
    userdetail: DataTypes.INTEGER,
  }, {
    freezeTableName: true
  });

  User.register = async function (data, redirect) {
    bcrypt.hash(data.pwd, saltRound, function(err, hash) {
      User.create({
        username: data.usr,
        password: hash,
        block: false,
        userdetail: null,
      }).then(user => redirect(null, user))
        .catch(err => redirect(err, null))
    });
  };

  User.addProfile = async function (user, profile) {
    User.update({
      userdetail: profile.id
    }, {
      where: { id: user.id }
    })
  }

  User.prototype.validPassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, res) => {
      return done(err, res);
    });
  };

  User.associate = function (models) {
  };
  
  return User;
};
