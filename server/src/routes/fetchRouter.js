const express = require('express');

const fetchController = require('../controllers/fetchController');
const fetchValidator = require('../validators/fetchValidator');

const router = express.Router();

router.get('/:id', fetchValidator.fetchValidator, fetchController.fetch);

module.exports = router;
