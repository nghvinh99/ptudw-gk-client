const { Product } = require('../models/');
const { Group } = require('../models/');
const { Type } = require('../models/');
const { Brand } = require('../models/');

const shopController = {};

shopController.getAllProduct = async (req, res, next) => {
    let perPage = req.query.perPage || 6;
    let page = req.query.page || 1;

    let order = req.query.order || 'ASC';
    let orderBy = req.query.orderBy || 'id';

    group = await Group.findAll({ raw: true});
    type = await Type.findAll({ raw: true});
    brand = await Brand.findAll({ raw: true});
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
                    group, type, brand,
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

module.exports = shopController;