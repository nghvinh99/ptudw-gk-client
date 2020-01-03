'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user: DataTypes.INTEGER,
    detail: DataTypes.TEXT,
    state: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    note: DataTypes.STRING,
    COD: DataTypes.BOOLEAN,
    cost: DataTypes.BIGINT
  }, {
    freezeTableName: true
  });

  Order.add = (detail, info, next) => {
    const cart = JSON.parse(detail);
    let sumMoney = 0;
    cart.forEach((item) => {
      sumMoney += parseInt(item.price) * parseInt(item.quantity);
    })
    const userId = info.user.id;
    Order.create({
      user: userId,
      detail: detail,
      state: 'Pending',
      name: info.name,
      phone: info.phone,
      email: info.email,
      address: info.address,
      note: info.note,
      COD: info.COD,
      cost: sumMoney
    }).then((order) => {
      next(null, order);
    }).catch((err) => {
      next(err, null);
    })
  }

  Order.associate = function(models) {
  };
  return Order;
};