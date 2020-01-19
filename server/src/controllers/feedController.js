const { validationResult } = require('express-validator');
const HttpStatus = require('http-status-codes');

const feedService = require('../services/feedService');
const { RssFeedUrl } = require('../models');

console.log(feedService);

exports.add = async (req, res) => {
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

exports.change = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  const serviceResponse = await feedService.change(req.body);

  return res.status(serviceResponse.status).send({ message: serviceResponse.message });
};

exports.feeds = async (req, res) => {
  const feedValues = await feedService.feeds();
  return res.status(HttpStatus.OK).send(feedValues);
};

exports.deleteFeed = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }

  await feedService.deleteFeed({ id: req.params.id });
  return res.status(HttpStatus.OK).send();
};
