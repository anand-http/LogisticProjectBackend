const express = require('express');
const router = express.Router();
const tableauJWTController = require('../../controllers/tableauJWTController2');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(tableauJWTController.handleTableauJWT);
    
module.exports = router;