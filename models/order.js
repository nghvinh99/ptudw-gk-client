'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};