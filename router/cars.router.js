const express = require('express');
const CarsController = require('../controller/cars.controller');

const router = express.Router();
router
    .get('/cars', CarsController.GET)
    .get('/create_car', CarsController.GET_FORM_CREATE)
    .get('/create_car/:userId', CarsController.GET_FORM_CREATE_BY)
    .post('/cars', CarsController.POST)
    .post('/cars/:userId', CarsController.POST_BY)
    .get('/update_car/:id', CarsController.GET_FORM_UPDATE)
    .get('/update_car/:id/:userId', CarsController.GET_FORM_UPDATE_BY)
    .post('/cars/:id', CarsController.PUT)
    .post('/cars/:id/:userId', CarsController.PUT_BY)
    .get('/delete_car/:id', CarsController.DELETE)
    .get('/delete_car/:id/:userId', CarsController.DELETE_BY)

module.exports = router;