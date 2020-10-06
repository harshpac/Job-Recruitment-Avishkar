const express = require('express');

const router = express.Router();

const control = require('../controllers/companies');

router.get('/comp/loginSignup', control.getCompPage);

router.post('/comp/login', control.postLogin);

router.post('/comp/SignUp', control.postSignUp);

module.exports = router;