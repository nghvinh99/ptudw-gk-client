var express = require('express');
var router = express.Router();
const index = require('../controllers/index');

router.get('/', index.getHomePage);

router.get('/contact', index.getContact);

router.get('/about', index.getAbout);

module.exports = router;
