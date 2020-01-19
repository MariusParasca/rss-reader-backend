const express = require('express');

const itemsController = require('../controllers/itemsController');
const itemsValidator = require('../validators/itemsValidator');

const router = express.Router();

router.get('/', itemsValidator.getItemsValidator, itemsController.getItems);

module.exports = router;
