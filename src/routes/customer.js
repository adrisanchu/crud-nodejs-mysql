const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

// routes of our project to be exported ...
router.get('/', customerController.list);
router.post('/add', customerController.save);

router.get('/update/:id', customerController.edit);
router.post('/update/:id', customerController.update);

router.get('/delete/:id', customerController.delete);

module.exports = router;