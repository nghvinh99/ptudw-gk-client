var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('pages/users/login', { title: 'Đăng nhập', breadcrumb: 'Trang chủ / Khách / Đăng nhập' });
});

router.post('/login', passport.authenticate('local', 
  { successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: false })
);

router.get('/login/account', function (req, res, next) {
  res.render('pages/users/account', { title: 'Tài khoản', breadcrumb: 'Trang chủ / Khách / Tài khoản' });
});

router.get('/login/account/confirm', function (req, res, next) {
  res.render('pages/users/acc-confirm', { title: 'Xác nhận', breadcrumb: 'Trang chủ / Khách / Tài khoản / Xác nhận' });
});

router.get('/forgot', function (req, res, next) {
  res.render('pages/users/forgot', { title: 'Khôi phục', breadcrumb: 'Trang chủ / Khách / Khôi phục' });
});

router.get('/forgot/confirm', function (req, res, next) {
  res.render('pages/users/forg-confirm', { title: 'Xác nhận', breadcrumb: 'Trang chủ / Khách / Forgot password / Confirmation' });
});


router.get('/register', function (req, res, next) {
  res.render('pages/users/register', { title: 'Đăng kí', breadcrumb: 'Trang chủ / Khách / Register' });
});

router.get('/register/confirm', function (req, res, next) {
  res.render('pages/users/confirmation', { title: 'Xác nhận', breadcrumb: 'Trang chủ / Khách / Confirmation' });
});


module.exports = router;
