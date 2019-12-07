const { Product } = require('../models/');
const { Group } = require('../models/');

const shopController = {};

shopController.getAllProduct = (req, res, next) => {
    Group.findAll({ raw: true })
        .then(result => category = result);
    Product.findAll({ raw: true })
        .then(result => {
            res.render('pages/shop/category',
                {
                    title: 'Cửa hàng',
                    range: 'Tất cả',
                    breadcrumb: 'Trang chủ / Cửa hàng',
                    product: result,
                    category: category
                });
        })
}

shopController.getCart = (req, res, next) => {
    res.render('pages/shop/cart',
        {
            title: 'Giỏ hàng',
            breadcrumb: 'Trang chủ / Cửa hàng / Giỏ hàng'
        });
}

shopController.getOneProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findOne(
        {
            where: { id: id },
            raw: true
        })
        .then(result => {
            res.render('pages/shop/single-product',
                {
                    title: 'Chi tiết',
                    breadcrumb: 'Trang chủ / Cửa hàng / ' + result.name,
                    product: result
                });
        })
}

shopController.getCategory = (req, res, next) => {
    const id = req.params.id;
    Group.findOne({ where: { id: id } })
        .then(result => Chosen = result.name);
    Group.findAll({ raw: true })
        .then(result => category = result)
    Product.findAll(
        {
            where: { groupId: id },
            raw: true
        })
        .then(result => {
            res.render('pages/shop/category',
                {
                    title: 'Cửa hàng',
                    range: Chosen,
                    breadcrumb: 'Trang chủ / Cửa hàng / ' + Chosen,
                    product: result,
                    category: category
                });
        })
}

module.exports = shopController;