const { validationResult } = require('express-validator');
const HttpStatus = require('http-status-codes');

const { RESULTS_PER_PAGE } = require('../utils/constants');
const itemsService = require('../services/itemsService');

exports.getItems = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  const offset = Number(req.query.offset) || 0;

  if (req.query.feedId) {
    const data = await itemsService.getItemsWithPagination({ rssFeedUrlId: req.query.feedId, offset });

    return res.status(HttpStatus.OK).json({
      items: data.items,
      numOfResults: data.count,
    });
  }
};

exports.deleteItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }
};
