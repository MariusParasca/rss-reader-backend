import express from 'express';

import * as fetchController from '@controllers/fetchController';
import fetchValidator from '@validators/fetchValidator';

const router = express.Router();

router.get('/:id', fetchValidator, fetchController.fetch);

export default router;
