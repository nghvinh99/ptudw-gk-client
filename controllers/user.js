const { check, validationResult } = require('express-validator');
const passport = require('../config/passport');
const { User } = require('../models/');

const userController = {};

userController.login = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    const errors = req.flash().error || [];
    res.render('pages/users/login',
        {
            title: 'Đăng nhập',
            breadcrumb: 'Trang chủ / Khách / Đăng nhập',
            errors
        });
}

userController.authentication = passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    });

userController.authenticationCheck = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
}

userController.logout = (req, res, next) => {
    req.logout();
    res.redirect('/users/login');
}

userController.getPersonalInfo = (req, res, next) => {
    res.render('pages/users/account',
        {
            title: 'Tài khoản',
            breadcrumb: 'Trang chủ / Khách / Tài khoản'
        });
}

userController.register = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    const errors = req.flash().error || [];
    res.render('pages/users/register',
        {
            title: 'Đăng kí',
            breadcrumb: 'Trang chủ / Khách / Register',
            errors
        });
}

userController.validateRegister = [
    check('username', 'Tài khoản phải có độ dài từ 4-30').isLength({ min: 4, max: 30 }),
    check('password', 'Mật khẩu phải có độ dài tối thiểu là 6').isLength({ min: 6 })
]

userController.postRegister = (req, res, next) => {

    if (!validationResult(req).isEmpty()) {
        const valid = validationResult(req).array();
        for (let i = 0; i < valid.length; i++) {
            req.flash('error', valid[i].msg);
        }
        res.redirect('/users/register');
    } else {
        const usr = req.body.username;
        const pwd = req.body.password;
        user = new User();
        user.register(usr, pwd, (err, user) => {
            if (err) {
                req.flash('error', 'Tài khoản đã tồn tại. Hãy đặt tên khác')
                res.redirect('/users/register');
            } else {
                req.login(user, function (err) {
                    res.redirect('/users/register/confirm');
                })
            }
        });
    }
}

userController.editPersonalInfoConfirm = (req, res, next) => {
    res.render('pages/users/acc-confirm',
        {
            title: 'Xác nhận',
            breadcrumb: 'Trang chủ / Khách / Tài khoản / Xác nhận'
        });
}

userController.forgetPassword = (req, res, next) => {
    res.render('pages/users/forget',
        {
            title: 'Quên mật khẩu',
            breadcrumb: 'Trang chủ / Khách / Khôi phục'
        });
}

userController.forgetPasswordConfirm = (req, res, next) => {
    res.render('pages/users/forg-confirm',
        {
            title: 'Xác nhận',
            breadcrumb: 'Trang chủ / Khách / Quên mật khẩu / Xác nhận'
        });
}

userController.registerConfirm = (req, res, next) => {
    res.render('pages/users/confirmation',
        {
            title: 'Xác nhận',
            breadcrumb: 'Trang chủ / Khách / Xác nhận'
        });
}

module.exports = userController;