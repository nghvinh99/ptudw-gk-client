const serviceController = {};

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

serviceController.checkoutConfirm = (req, res, next) => {
    res.render('pages/services/confirmation',
        {
            title: 'Xác nhận',
            breadcrumb: 'Trang chủ / Tiện ích / Xác nhận'
        });
}

module.exports = serviceController;