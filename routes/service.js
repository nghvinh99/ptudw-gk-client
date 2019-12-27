var express = require('express');
var router = express.Router();
const service = require('../controllers/service');

/* GET users listing. */
router.get('/tracking', service.tracking);

router.get('/tracking/shipment', service.shipment);

router.get('/checkout', service.checkout);//service.authenticationCheck, 

router.get('/confirm', service.checkoutConfirm);

module.exports = router;
