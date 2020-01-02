'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
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

  OrderDetail.add = (detail, info, next) => {
    const cart = JSON.parse(detail);
    let sumMoney = 0;
    cart.forEach((item) => {
      sumMoney += parseInt(item.price) * parseInt(item.quantity);
    })
    OrderDetail.create({
      detail: detail,
      state: 'pending',
      name: info.name,
      phone: info.phone,
      email: info.email,
      address: info.address,
      note: info.note,
      COD: info.COD,
      cost: sumMoney
    }).then( (result) => {
      next(result);
    })
  }

  OrderDetail.associate = function(models) {
  };
  return OrderDetail;
};