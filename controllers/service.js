const serviceController = {};
const { Order } = require('../models/');

serviceController.tracking = (req, res, next) => {
    res.render('pages/services/tracking',
        {
            title: 'Tiến độ đơn hàng',
            breadcrumb: 'Trang chủ / Tiện ích / Tiến độ đơn hàng'
        });
}

serviceController.shipment = (req, res, next) => {
    res.render('pages/services/shipment',
        {
            title: 'Tiến độ đơn hàng',
            breadcrumb: 'Trang chủ / Tiện ích / Tiến độ đơn hàng / Vận chuyển'
        });
}

serviceController.authenticationCheck = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
}

serviceController.checkout = (req, res, next) => {
    res.render('pages/services/checkout',
        {
            title: 'Thanh toán',
            breadcrumb: 'Trang chủ / Tiện ích / Thanh toán'
        });
}

serviceController.createOrder = (req, res, next) => {
    const cart = req.body.itemList;
    const info = {
        user: req.user,
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email,
        address : req.body.address,
        note: req.body.note,
        COD: req.body.payment
    }
    Order.add(cart, info, (err, order) => {
        console.log(err);
        console.log(order);
        res.end();
    });
}

serviceController.checkoutConfirm = (req, res, next) => {
    res.render('pages/services/confirmation',
        {
            title: 'Xác nhận',
            breadcrumb: 'Trang chủ / Tiện ích / Xác nhận'
        });
}

module.exports = serviceController;