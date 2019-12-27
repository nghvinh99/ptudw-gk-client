'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    details: DataTypes.STRING,
    state: DataTypes.STRING,
    cost: DataTypes.BIGINT
  }, {
    freezeTableName: true
  });
  OrderDetail.associate = function(models) {
    // associations can be defined here
  };
  return OrderDetail;
};