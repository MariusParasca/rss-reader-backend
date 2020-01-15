import { validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';

import * as feedService from '@services/feedService';

export const add = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  const { url } = req.body;

  const serviceResponse = await feedService.addRssUrl({ url });

  if (serviceResponse.status === HttpStatus.OK) {
    return res.status(serviceResponse.status).send({ id: serviceResponse.id, title: serviceResponse.title });
  }
  return res.status(serviceResponse.status).send({ message: serviceResponse.message });
};

export const change = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  const serviceResponse = await feedService.change(req.body);

  return res.status(serviceResponse.status).send({ message: serviceResponse.message });
};

export const feeds = async (req, res) => {
  const feedValues = await feedService.feeds();
  return res.status(HttpStatus.OK).send(feedValues);
};
