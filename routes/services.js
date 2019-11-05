var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/tracking', function (req, res, next) {
  res.render('pages/services/tracking', { title: 'Tiến độ đơn hàng', breadcrumb: 'Trang chủ / Tiện ích / Tiến độ đơn hàng' });
});

router.get('/tracking/shipment', function (req, res, next) {
  res.render('pages/services/shipment', { title: 'Tiến độ đơn hàng', breadcrumb: 'Trang chủ / Tiện ích / Tiến độ đơn hàng / Vận chuyển' });
});

router.get('/checkout', function (req, res, next) {
  res.render('pages/services/checkout', { title: 'Thanh toán', breadcrumb: 'Trang chủ / Tiện ích / Thanh toán' });
});

router.get('/confirm', function (req, res, next) {
  res.render('pages/services/confirmation', { title: 'Xác nhận', breadcrumb: 'Trang chủ / Tiện ích / Xác nhận' });
});


module.exports = router;
