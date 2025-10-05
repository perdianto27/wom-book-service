const express = require('express');
const Router = express.Router();

const { verifyBasic  } = require('../middleware/auth/basic-auth');

const { validator } = require('../middleware/validator');
const { postBook, updateStockValidation } = require('../middleware/validator/schema/BookValidation');

const { ROLE  } = require('../helpers/constant');
const book = require('../controller/BookController');

Router.get('/', verifyBasic(), book.getBooks);
Router.get('/:id', verifyBasic([], { optional: true }), book.getBookById);
Router.post('/', verifyBasic([ROLE.ID.ADMIN]), validator(postBook), book.postBook);

Router.patch(
  '/:id/stock',
  verifyBasic([ROLE.ID.ADMIN]),
  validator(updateStockValidation),
  book.updateBookStock
);

Router.patch('/:id/deactivate', verifyBasic([ROLE.ID.ADMIN]), book.deleteBookById);

module.exports = Router;