var express = require('express');
var router = express.Router();
var pool = require('../config/database');

router.get('/', function(req, res, next) {
  let category;
  pool.query('SELECT * FROM PHANLOAI ORDER BY id ASC', function (err, result) {
    if (err) {
      res.end();
      return console.log('error running query', err);
    } else {
      category = result;
    }
  })
  pool.query('SELECT * FROM SANPHAM ORDER BY id ASC', function (err, result) {
    if (err) {
      res.end();
      return console.log('error running query', err);
    } else {
      res.render('pages/shop/category', 
      { title: 'Cửa hàng' , 
      range: 'Tất cả',
      breadcrumb: 'Trang chủ / Cửa hàng',
      sanpham: result,
      category: category});
    }
  })
});

router.get('/cart', function (req, res, next) {
  res.render('pages/shop/cart', { title: 'Giỏ hàng', breadcrumb: 'Trang chủ / Cửa hàng / Giỏ hàng' });
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  pool.query("SELECT * FROM SANPHAM WHERE id = '"+id+"'", function (err, result){
    if (err) {
      res.end();
      return console.log('Error running query');
    } else {
      res.render('pages/shop/single-product', 
      { title: 'Chi tiết' , 
      breadcrumb: 'Trang chủ / Cửa hàng / ' + result.rows[0].ten_sanpham,
      product: result.rows[0]});
    }
  })
});

router.get('/category/:id', function (req, res, next) {
  const id = req.params.id;
  let category;
  pool.query('SELECT * FROM PHANLOAI_SANPHAM', function (err, result) {
    if (err) {
      res.end();
      return console.log('error running query', err);
    } else {
      category = result;
    }
  })
  pool.query("SELECT * FROM SANPHAM WHERE phanloai_sanpham = (select phanloai from phanloai_sanpham where id = '"+id+"')", 
  function (err, result) {
    if (err) {
      res.end();
      return console.log('Error running query',err);
    } else {
      res.render('pages/shop/category', 
      { title: 'Cửa hàng', 
      range: result.rows[0].phanloai_sanpham,
      breadcrumb: 'Trang chủ / Cửa hàng / '+ result.rows[0].phanloai_sanpham,
      sanpham: result,
      category: category});
    }
  })
});

module.exports = router;
