const { StatusCodes } = require('http-status-codes');

const { Cart, CartItem, Book, sequelize } = require('../models');
const createError = require('../utils/customError');
const Logger = require('../helpers/logger');

const logName = 'Service Cart';

const addToCartService = async (email, bookId, quantity = 1) => {
  const t = await sequelize.transaction();
  try {
    const book = await Book.findOne({
      where: { id: bookId, is_active: true },
      lock: t.LOCK.UPDATE,
      transaction: t
    });

    if (!book) throw createError('Buku tidak ditemukan', StatusCodes.NOT_FOUND);
    if (book.stock < quantity) {
      throw createError('Stock buku tidak mencukupi', StatusCodes.BAD_REQUEST);
    }

    let cart = await Cart.findOne({ where: { email }, transaction: t });
    if (!cart) cart = await Cart.create({ email }, { transaction: t });

    let cartItem = await CartItem.findOne({ where: { cart_id: cart.id, book_id: bookId }, transaction: t });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save({ transaction: t });
    } else {
      cartItem = await CartItem.create({ cart_id: cart.id, book_id: bookId, quantity }, { transaction: t });
    }

    await t.commit();
    return cartItem;
  } catch (err) {
    await t.rollback();
    Logger.log([logName, 'ADD Cart', 'ERROR'], {
      message: `${err}`,
    });
    throw err;
  }
};

const removeFromCartService = async (email, bookId) => {
  try {
    const cart = await Cart.findOne({ where: { email } });
    if (!cart) {
      throw new CustomError('Keranjang tidak ditemukan', StatusCodes.NOT_FOUND);
    }

    const deleted = await CartItem.destroy({
      where: { cart_id: cart.id, book_id: bookId }
    });

    if (!deleted) {
      throw new CustomError('Buku tidak ada di keranjang', StatusCodes.NOT_FOUND);
    }

    return cart;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addToCartService,
  removeFromCartService
};
