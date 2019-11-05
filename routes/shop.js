var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/shop/category', { title: 'Cửa hàng' , breadcrumb: 'Trang chủ / Cửa hàng'});
});

router.get('/cart', function (req, res, next) {
  res.render('pages/shop/cart', { title: 'Giỏ hàng', breadcrumb: 'Trang chủ / Cửa hàng / Giỏ hàng' });
});

router.get('/1', function(req, res, next) {
  res.render('pages/shop/single-product', { title: 'Chi tiết' , breadcrumb: 'Trang chủ / Cửa hàng / 1'});
});

module.exports = router;
