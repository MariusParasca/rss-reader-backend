import { query } from 'express-validator';

import uuIDv4 from '@utils/isUuIDv4';

export const getItemsValidator = [
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
