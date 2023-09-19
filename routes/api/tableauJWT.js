const express = require('express');
const router = express.Router();
const {handleTableauJWT} = require('../../controllers/tableauJWTcontroller2')
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(handleTableauJWT);
    
module.exports = router;