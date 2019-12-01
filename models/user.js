'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  User.prototype.validPassword = function(password) {
    console.log("CORRECT PWD: " + this.password);
    return this.password == password;
  }

  User.associate = function (models) {
  };
  
  return User;
};
