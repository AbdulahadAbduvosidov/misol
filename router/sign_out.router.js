const express = require('express');
const SignOutController = require('../controller/sign_out.controller');

const router = express.Router();
router
    .get('/sign_out', SignOutController.GET)

module.exports = router;