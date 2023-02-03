const express = require('express');
const FruitsController = require('../controller/fruits.controller');

const router = express.Router();
router
    .get('/fruits', FruitsController.GET)
    .get('/create_fruit', FruitsController.GET_FORM_CREATE)
    .get('/create_fruit/:userId', FruitsController.GET_FORM_CREATE_BY)
    .post('/fruits', FruitsController.POST)
    .post('/fruits/:userId', FruitsController.POST_BY)
    .get('/update_fruit/:id', FruitsController.GET_FORM_UPDATE)
    .get('/update_fruit/:id/:userId', FruitsController.GET_FORM_UPDATE_BY)
    .post('/fruits/:id', FruitsController.PUT)
    .post('/fruits/:id/:userId', FruitsController.PUT_BY)
    .get('/delete_fruit/:id', FruitsController.DELETE)
    .get('/delete_fruit/:id/:userId', FruitsController.DELETE_BY)

module.exports = router;