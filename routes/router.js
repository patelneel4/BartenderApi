const express = require('express');
const router = express.Router();

router.use('/pin',require('./api/pinRoutes'));
router.use('/liquids', require('./api/liquidRoutes'));
router.use('/drinks', require('./api/drinkRoutes'));
router.use('/pumps', require('./api/pumpRoutes'));
module.exports = router;
