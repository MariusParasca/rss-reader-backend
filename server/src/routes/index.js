const express = require('express');

const feedRouter = require('./feedRouter');
const fetchRouter = require('./fetchRouter');
const itemsRouter = require('./itemsRouter');

const router = express.Router();

router.use('/', feedRouter);
router.use('/fetch', fetchRouter);
router.use('/items', itemsRouter);

module.exports = router;
