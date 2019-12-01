var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var { User } = require('../models/');

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('pages/users/login', { title: 'Đăng nhập', breadcrumb: 'Trang chủ / Khách / Đăng nhập' });
});

router.post('/login', passport.authenticate('local', 
  { successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: false })
);

router.get('/logout', function (req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/account', function (req, res, next) {
  res.render('pages/users/account', { title: 'Tài khoản', breadcrumb: 'Trang chủ / Khách / Tài khoản' });
});

router.get('/account/confirm', function (req, res, next) {
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

router.post('/register', function (req, res, next) {
  const usr = req.body.username;
  const pwd = req.body.password;
  
  User.create({
    username: usr,
    password: pwd,
    block: false
  }).then(user => res.redirect('/users/register/confirm'))
    .catch(err => res.redirect('/users/register'));
});


router.get('/register/confirm', function (req, res, next) {
  res.render('pages/users/confirmation', { title: 'Xác nhận', breadcrumb: 'Trang chủ / Khách / Confirmation' });
});


module.exports = router;
