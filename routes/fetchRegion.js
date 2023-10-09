const express = require('express');
const router = express.Router();
const fetchRegionController = require('../controllers/fetchRegionController');

router.post('/', fetchRegionController.fetchRegion);

module.exports = router;