const express = require('express');
const UsersController = require('../controller/users.controller');

const router = express.Router();
router
    .get('/users', UsersController.GET)
    .get('/user/:id', UsersController.GET_USER)
    .get('/create_user', UsersController.GET_FORM_CREATE)
    .post('/users', UsersController.POST)
    .get('/update_user/:id', UsersController.GET_FORM_UPDATE)
    .post('/users/:id', UsersController.PUT)
    .get('/delete_user/:id', UsersController.DELETE)

module.exports = router;