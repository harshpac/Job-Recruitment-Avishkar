const express = require('express');

const router = express.Router();

const control = require('../controllers/developers');

router.get('/dev/loginSignUp',control.getDevPage);

router.post('/dev/login', control.postLogin);

router.post('/dev/SignUp', control.postSignUp);

module.exports = router;