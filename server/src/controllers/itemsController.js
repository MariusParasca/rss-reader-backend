import { validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';

import * as itemsService from '@services/itemsService';

export const getItems = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  if (req.query.feedId) {
    const data = await itemsService.getAllItemsByFeedId({ rssFeedUrlId: req.query.feedId });
    return res.status(HttpStatus.OK).json(data);
  }

  const data = await itemsService.getAllItemsForAllFeeds();
  return res.status(HttpStatus.OK).json(data);
};

export default getItems;
