const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

// routes of our project to be exported ...
router.get('/', customerController.list);


module.exports = router;