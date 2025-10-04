const { StatusCodes } = require('http-status-codes');

const { Book,Cart, CartItem } = require("../models");

const Logger = require('../helpers/logger');

const { addToCartService, removeFromCartService } = require('../services/CartService');

const logName = 'API Cart';

const addToCart = async (request, reply) => {
  try {
    const { bookId, quantity } = request.body;
    const email = request.user.email;
    const cartItem = await addToCartService(email, bookId, quantity || 1);

    return reply
    .status(StatusCodes.OK)
    .send({
      responseCode: StatusCodes.OK,
      responseDesc: "Buku berhasil ditambahkan ke keranjang",
      data: cartItem
  });
  } catch (err) {
    Logger.log([logName, 'POST Add Cart', 'ERROR'], {
      message: `${err}`,
    });
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return reply
      .status(statusCode)
      .send({
        responseCode: statusCode,
        responseDesc: err.message || "Terjadi kesalahan pada server"
    });
  }
};

const removeFromCart = async (request, reply) => {
  try {
    const { bookId } = request.params;
    const email = request.user.email;
    await removeFromCartService(email, bookId);

    return reply
    .status(StatusCodes.OK)
    .send({
      responseCode: StatusCodes.OK,
      responseDesc: "Buku berhasil dihapus dari keranjang"
  });
  } catch (err) {
    Logger.log([logName, 'POST Remove from Cart', 'ERROR'], {
      message: `${err}`,
    });
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return reply
      .status(statusCode)
      .send({
        responseCode: statusCode,
        responseDesc: err.message || "Terjadi kesalahan pada server"
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart
};