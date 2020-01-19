const { check, checkSchema, param } = require('express-validator');

exports.addValidator = [check('url').isURL()];

const statusSchema = {
  status: {
    in: 'body',
    matches: {
      options: [/\b(?:active|inactive|removed)\b/],
      errorMessage: 'Invalid status',
    },
  },
};

exports.changeValidator = [check('id').isUUID(), checkSchema(statusSchema)];

exports.deleteFeedValidator = [param('id').isUUID()];
