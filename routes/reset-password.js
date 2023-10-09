const express = require('express');
const router = express.Router();
const ResetPasswordController = require('../controllers/resetPasswordController');

router.post('/', ResetPasswordController.ResetPassword);

module.exports = router;