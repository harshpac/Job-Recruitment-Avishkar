const express = require('express');

const router  = express.Router();

const cntrl = require('../controllers/main');

router.get('/',cntrl.getIndex);

module.exports = router;