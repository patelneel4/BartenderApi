const express = require('express');
const router = express.Router();

router.use('/pin',require('./api/pinRoutes'));
router.use('/liquids', require('./api/liquidsRoutes'));
module.exports = router;
