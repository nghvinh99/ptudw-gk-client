const indexController = {};

indexController.getHomePage = (req, res, next) => {
    res.render('index',
        { title: 'Winter' });
}

indexController.getContact = (req, res, next) => {
    res.render('pages/home/contact',
        {
            title: 'Liên hệ',
            breadcrumb: 'Trang chủ / Liên hệ'
        });
}

indexController.getAbout = (req, res, next) => {
    res.render('pages/home/about',
        {
            title: 'Thông tin',
            breadcrumb: 'Trang chủ / Thông tin'
        });
}

module.exports = indexController;