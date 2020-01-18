import { validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';

import { RESULTS_PER_PAGE } from '@utils/constants';
import * as itemsService from '@services/itemsService';

export const getItems = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  const offset = Number(req.query.page) || 1;

  if (req.query.feedId) {
    const data = await itemsService.getItemsWithPagination({ rssFeedUrlId: req.query.feedId, offset });
    return res.status(HttpStatus.OK).json({
      items: data.items,
      numOfResults: data.count,
    });
  }
};

export const deleteItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }
};

export default getItems;
