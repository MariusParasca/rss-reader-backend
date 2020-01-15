import { query } from 'express-validator';

export const itemsValidator = [
  query('feedId')
    .optional()
    .isUUID(),
];
