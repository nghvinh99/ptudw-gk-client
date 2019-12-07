var express = require('express');
var router = express.Router();
const shop = require('../controllers/shop');

router.get('/', shop.getAllProduct);

router.get('/cart', shop.getCart);

router.get('/:id', shop.getOneProduct);

router.get('/category/:id', shop.getCategory);

module.exports = router;
