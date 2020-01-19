const express = require('express');

const feedController = require('../controllers/feedController');
const feedValidator = require('../validators/feedValidator');

const router = express.Router();

router.post('/feed/add', feedValidator.addValidator, feedController.add);

router.post('/feed/change', feedValidator.changeValidator, feedController.change);

router.get('/feeds', feedController.feeds);

router.delete('/feeds/:id', feedValidator.deleteFeedValidator, feedController.deleteFeed);

module.exports = router;
