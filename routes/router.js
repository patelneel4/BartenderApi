const express = require('express');
const router = express.Router();

router.use('/pin',require('./api/pinRoutes'));

module.exports = router;
