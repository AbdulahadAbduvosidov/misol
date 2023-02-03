const express = require('express');
const SignInController = require('../controller/sign_in.controller');

const router = express.Router();
router
    .get('/sign_in', SignInController.GET_FORM_SIGN_IN)
    .post('/sign_in', SignInController.POST)

module.exports = router;