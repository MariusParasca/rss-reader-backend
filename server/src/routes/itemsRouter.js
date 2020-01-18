import express from 'express';

import * as itemsController from '@controllers/itemsController';
import * as itemsValidator from '@validators/itemsValidator';

const router = express.Router();

router.get('/', itemsValidator.getItemsValidator, itemsController.getItems);

export default router;
