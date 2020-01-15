import express from 'express';
import cors from 'cors';

import routes from '@routes';
import { autoFetchItemsService } from '@services/autoFetchItemsService';
import '@models/database';

require('dotenv').config();

const app = express();

app.use(cors(), express.json());

app.use(routes);

app.listen(process.env.PORT, () => console.info(`Server started on port ${process.env.PORT}`));

autoFetchItemsService();
