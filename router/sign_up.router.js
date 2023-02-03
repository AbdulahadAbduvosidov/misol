const express = require('express');
const SignUpController = require('../controller/sign_up.controller');

const router = express.Router();
router
    .get('/sign_up', SignUpController.GET_FORM_SIGN_UP)
    .post('/sign_up', SignUpController.POST)

module.exports = router;