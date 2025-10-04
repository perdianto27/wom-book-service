const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const logger = require('./helpers/logger');

const auth = require('./routes/AuthRoutes');
const user = require('./routes/UserRoutes');
const book = require('./routes/BookRoutes');

const app = express()
const port = process.env.PORT || 9000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger.httpLogger);

app.use('/auth', auth);
app.use('/user', user);
app.use('/book', book);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})