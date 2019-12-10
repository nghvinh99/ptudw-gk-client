const { Product } = require('../models/');
const { Group } = require('../models/');

const shopController = {};

shopController.getAllProduct = (req, res, next) => {
    let perPage = req.query.perPage || 6;
    let page = req.query.page || 1;

    let order = req.query.order || 'ASC';
    let orderBy = req.query.orderBy || 'id';

    Group.findAll({ raw: true })
        .then(result => category = result);
    Product.count({raw: true}).then(result => numOfRows = result);
    Product.findAll({ 
        raw: true,
        limit: perPage,
        offset: (page-1)*perPage,
        order:[
            [orderBy, order]
        ],
    })  .then(result => {
            let link = req.url;
            res.render('pages/shop/category',
                {
                    title: "Cửa hàng",
                    range: 'Tất cả',
                    breadcrumb: 'Trang chủ / Cửa hàng',
                    product: result,
                    category: category,
                    currentLink: link, 
                    pages: Math.ceil(numOfRows / perPage),
                    current: page,
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
    let perPage = req.query.perPage || 6;
    let page = req.query.page || 1;
    
    let order = req.query.order || 'ASC';
    let orderBy = req.query.orderBy || 'id';

    const id = req.params.id;
    Group.findOne({ where: { id: id } })
        .then(result => Chosen = result.name);
    Group.findAll({ raw: true })
        .then(result => category = result);
    Product.count({raw: true, where:{groupId: id}}).then(result => numOfRows = result);
    Product.findAll(
        {
            where: { groupId: id },
            raw: true,
            limit: perPage,
            offset: (page-1)*perPage
        })
        .then(result => {
            res.render('pages/shop/category',
                {
                    title: 'Cửa hàng',
                    range: Chosen,
                    breadcrumb: 'Trang chủ / Cửa hàng / ' + Chosen,
                    product: result,
                    category: category,
                    pages: Math.ceil(numOfRows / perPage),
                    current: page,
                });
        })
}

module.exports = shopController;