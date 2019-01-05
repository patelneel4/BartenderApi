const express = require('express');
const router = express.Router();

router.use('/pin',require('./api/pinRoutes'));
router.use('/liquids', require('./api/liquidsRoutes'));
router.use('/drinks', require('./api/drinksRoutes'));
module.exports = router;
