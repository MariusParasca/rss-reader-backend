const { query } = require('express-validator');

const uuIDv4 = require('../utils/isUuIDv4');

exports.getItemsValidator = [
  query('feedId')
    .custom(value => {
      if (!value) return true;
      const uuIDs = value.split(';');
      for (let i = 0; i < uuIDs.length; i++) {
        const uuID = uuIDs[i];
        if (!uuIDv4(uuID)) {
          return false;
        }
      }
      return true;
    })
    .exists(),
];
