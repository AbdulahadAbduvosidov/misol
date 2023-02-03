const express = require('express');
const AdminController = require('../controller/admin.controller');

const router = express.Router();
router
    .get('/admin/users', AdminController.GET)

module.exports = router;