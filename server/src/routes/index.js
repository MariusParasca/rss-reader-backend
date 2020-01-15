import express from 'express';

import feedRouter from './feedRouter';
import fetchRouter from './fetchRouter';
import itemsRouter from './itemsRouter';

const router = express.Router();

router.use('/', feedRouter);
router.use('/fetch', fetchRouter);
router.use('/items', itemsRouter);

export default router;
