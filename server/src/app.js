const express = require('express');
const cors = require('cors');

const routes = require('./routes');
require('./models/database');

require('dotenv').config();

const app = express();

app.use(cors(), express.json());

app.use(routes);

app.listen(process.env.PORT, () => console.info(`Server started on port ${process.env.PORT}`));
