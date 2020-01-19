const { validationResult } = require('express-validator');
const HttpStatus = require('http-status-codes');

const fetchService = require('../services/fetchService');

exports.fetch = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const serviceResponse = await fetchService.getItemsByFeedId({ id });

  return res.status(serviceResponse.status).send({ message: serviceResponse.message });
};
