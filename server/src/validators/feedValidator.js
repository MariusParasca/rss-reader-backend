import { check, checkSchema, param } from 'express-validator';

export const addValidator = [check('url').isURL()];

const statusSchema = {
  status: {
    in: 'body',
    matches: {
      options: [/\b(?:active|inactive|removed)\b/],
      errorMessage: 'Invalid status',
    },
  },
};

export const changeValidator = [check('id').isUUID(), checkSchema(statusSchema)];

export const deleteFeedValidator = [param('id').isUUID()];
