var express = require('express');
var router = express.Router();
const user = require('../controllers/user');

/* GET users listing. */
router.get('/login', user.login);

router.post('/login', user.authentication);

router.get('/logout', user.logout);

router.get('/account', user.authenticationCheck, user.getPersonalInfo);

router.get('/account/confirm', user.editPersonalInfoConfirm);

router.get('/forget', user.forgetPassword);

router.get('/forget/confirm', user.forgetPasswordConfirm);

router.get('/register', user.register);

router.post('/register', user.validateRegister, user.postRegister);

router.get('/register/confirm', user.registerConfirm);

module.exports = router;
