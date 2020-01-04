'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    images: DataTypes.ARRAY(DataTypes.STRING),
    quantity: DataTypes.INTEGER,
    sells: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
  }, {
    freezeTableName: true
  });

  Product.updateStock = (data, next) => {
    const cart = JSON.parse(data);
    cart.forEach((item) => {
      Product.decrement('quantity', {
        by: item.quantity,
        where: { id: item.id }
      }).catch((err) => {
        next(err);
      })
      Product.increment('sells', {
        by: item.quantity,
        where: { id: item.id }
      }).catch((err) => {
        next(err);
      })
    })
    next(null);
  }

  Product.associate = function(models) {
  };
  return Product;
};