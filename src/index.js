const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const logger = require('./helpers/logger');

const routes = require('./routes'); 

const app = express()
const port = process.env.PORT || 9000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger.httpLogger);

app.use(routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})