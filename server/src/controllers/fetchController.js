import { validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';

import * as fetchService from '@services/fetchService';

export const fetch = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const serviceResponse = await fetchService.getItemsByFeedId({ id });

  return res.status(serviceResponse.status).send({ message: serviceResponse.message });
};

export default fetch;
