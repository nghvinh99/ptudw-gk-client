var express = require('express');
var router = express.Router();
var { Product } = require('../models/');
var { Group } = require('../models/');

router.get('/', function(req, res, next) {
  Group.findAll({raw: true})
  .then( result => category = result);
  Product.findAll({raw: true})
  .then( result => {
    res.render('pages/shop/category', 
    { title: 'Cửa hàng' , 
    range: 'Tất cả',
    breadcrumb: 'Trang chủ / Cửa hàng',
    product: result,
    category: category});
  })
});

router.get('/cart', function (req, res, next) {
  res.render('pages/shop/cart', { title: 'Giỏ hàng', breadcrumb: 'Trang chủ / Cửa hàng / Giỏ hàng' });
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  Product.findOne(
    {
      where: {id: id}, 
      raw: true
    })
  .then( result => {
    res.render('pages/shop/single-product', 
    { title: 'Chi tiết' , 
    breadcrumb: 'Trang chủ / Cửa hàng / ' + result.name,
    product: result});
  })
});

router.get('/category/:id', function (req, res, next) {
  const id = req.params.id;
  Group.findOne({where: {id: id}})
  .then( result => Chosen = result.name);
  Group.findAll({raw: true})
  .then( result => category = result)
  Product.findAll(
    {
      where: {groupId: id}, 
      raw: true
    })
    .then(result => {
      res.render('pages/shop/category', 
      { title: 'Cửa hàng', 
      range: Chosen,
      breadcrumb: 'Trang chủ / Cửa hàng / '+ Chosen,
      product: result,
      category: category});
    })
});

module.exports = router;
