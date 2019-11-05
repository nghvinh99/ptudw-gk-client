var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Winter' });
});

router.get('/contact', function(req, res, next) {
  res.render('pages/home/contact', { title: 'Liên hệ' , breadcrumb: 'Trang chủ / Liên hệ'});
});

router.get('/about', function(req, res, next) {
  res.render('pages/home/about', { title: 'Thông tin' , breadcrumb: 'Trang chủ / Thông tin'});
});

module.exports = router;
