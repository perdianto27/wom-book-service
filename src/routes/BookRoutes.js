const express = require('express');
const Router = express.Router();

const { verifyBasic  } = require('../middleware/auth/basic-auth');

const { ROLE  } = require('../helpers/constant');
const book = require('../controller/BookController');

Router.get('/', verifyBasic(), book.getBooks);
Router.get('/:id', verifyBasic([], { optional: true }), book.getBookById);
Router.post('/', verifyBasic([ROLE.ID.ADMIN]), book.postBook);
Router.post('/:id', verifyBasic([ROLE.ID.ADMIN]), book.deleteBookById);

module.exports = Router;