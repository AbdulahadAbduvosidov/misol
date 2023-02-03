const express = require('express');
const AnimalsController = require('../controller/animals.controller');

const router = express.Router();
router
    .get('/animals', AnimalsController.GET)
    .get('/create_animal', AnimalsController.GET_FORM_CREATE)
    .get('/create_animal/:userId', AnimalsController.GET_FORM_CREATE_BY)
    .post('/animals', AnimalsController.POST)
    .post('/animals/:userId', AnimalsController.POST_BY)
    .get('/update_animal/:id', AnimalsController.GET_FORM_UPDATE)
    .get('/update_animal/:id/:userId', AnimalsController.GET_FORM_UPDATE_BY)
    .post('/animals/:id', AnimalsController.PUT)
    .post('/animals/:id/:userId', AnimalsController.PUT_BY)
    .get('/delete_animal/:id', AnimalsController.DELETE)
    .get('/delete_animal/:id/:userId', AnimalsController.DELETE_BY)

module.exports = router;