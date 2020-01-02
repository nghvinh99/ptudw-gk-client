'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserDetail = sequelize.define('UserDetail', {
    name: DataTypes.STRING,
    DoB: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
  }, {
    freezeTableName: true
  });

  UserDetail.newProfile = (data, next) => {
    UserDetail.create({
      name: data.name,
      DoB: data.DoB,
      email: data.email,
      phone: data.phone,
      gender: data.gender      
    }).then((profile) => {
      next(null, profile);
    }).catch((err) => {
      console.log(err);
      next(err, null);
    })
  }

  UserDetail.associate = function(models) {
    // associations can be defined here
  };
  return UserDetail;
};