var express = require('express');
var router = express.Router();
const service = require('../controllers/service');

/* GET users listing. */
router.get('/tracking', service.tracking);

router.get('/tracking/shipment', service.shipment);

router.get('/checkout', service.authenticationCheck, service.checkout);

router.get('/confirm', service.checkoutConfirm);

module.exports = router;
