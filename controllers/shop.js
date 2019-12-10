const { Product } = require('../models/');
const { Group } = require('../models/');
const { Type } = require('../models/');
const { Brand } = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const shopController = {};

shopController.getAllProduct = async (req, res, next) => {
    const perPage = req.query.perPage || 6;
    const page = req.query.page || 1;

    const order = req.query.order || 'ASC';
    const orderBy = req.query.orderBy || 'id';

    const filter = {
        group: req.query.group || {[Op.not]: null},
        type: req.query.type || {[Op.not]: null},
        brand: req.query.brand || {[Op.not]: null}
    };

    group = await Group.findAll({ raw: true});
    type = await Type.findAll({ raw: true});
    brand = await Brand.findAll({ raw: true});
    Product.count({raw: true}).then(result => numOfRows = result);
    Product.findAll({ 
        where: {
            groupId: filter.group,
            typeId: filter.type,
            brandId: filter.brand
        },
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