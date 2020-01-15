import express from 'express';

import * as feedController from '@controllers/feedController';
import * as feedValidator from '@validators/feedValidator';

const router = express.Router();

router.post('/feed/add', feedValidator.addValidator, feedController.add);

router.post('/feed/change', feedValidator.changeValidator, feedController.change);

router.get('/feeds', feedController.feeds);

export default router;
