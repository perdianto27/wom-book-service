const { StatusCodes } = require('http-status-codes');

const { Cart, CartItem, Book, Order, OrderItem, sequelize } = require('../models');
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
      throw new createError('Keranjang tidak ditemukan', StatusCodes.NOT_FOUND);
    }

    const deleted = await CartItem.destroy({
      where: { cart_id: cart.id, book_id: bookId }
    });

    if (!deleted) {
      throw new createError('Buku tidak ada di keranjang', StatusCodes.NOT_FOUND);
    }

    return cart;
  } catch (err) {
    Logger.log([logName, 'Remove from Cart', 'ERROR'], {
      message: `${err}`,
    });

    throw err;
  }
};


const checkoutCartService = async (email, paymentChannel, paymentReference) => {
  const t = await sequelize.transaction();
  try {
    const cart = await Cart.findOne({
      where: { email },
      include: [{ model: CartItem, as: 'items' }],
      transaction: t
    });

    if (!cart || cart.items.length === 0) throw new createError('Keranjang kosong', StatusCodes.BAD_REQUEST);
    console.log("Keranjang kosong");
    let totalAmount = 0;
    for (const item of cart.items) {
      console.log("item", item);
      const book = await Book.findOne({ where: { id: item.book_id }, lock: t.LOCK.UPDATE, transaction: t });
      if (!book || book.stock < item.quantity) 
      throw createError(`Stock tidak mencukupi untuk buku ${book.title}`, StatusCodes.BAD_REQUEST);
      totalAmount += Number(book.price) * item.quantity;
    }

    const order = await Order.create({
      email,
      order_number: `ORD-${Date.now()}`,
      total_amount: totalAmount,
      status: 'pending',
      payment_channel: paymentChannel,
      payment_reference: paymentReference
    }, { transaction: t });

    for (const item of cart.items) {
      const book = await Book.findOne({ where: { id: item.book_id }, transaction: t });
      await OrderItem.create({
        order_id: order.id,
        book_id: book.id,
        unit_price: book.price,
        quantity: item.quantity,
        subtotal: Number(book.price) * item.quantity
      }, { transaction: t });

      book.stock -= item.quantity;
      await book.save({ transaction: t });
    }

    await CartItem.destroy({ where: { cart_id: cart.id }, transaction: t });

    await t.commit();
    return order;
  } catch (err) {
    await t.rollback();
    Logger.log([logName, 'Checkout Cart', 'ERROR'], {
      message: `${err}`,
    });
    throw err;
  }
};
// Membuat payment link / inisiasi pembayaran
const createPaymentService = async (orderId, paymentChannel) => {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new createError("Order tidak ditemukan", StatusCodes.NOT_FOUND);
    }

    if (order.status !== "pending") {
      throw new createError("Order tidak bisa dibayar", StatusCodes.BAD_REQUEST);
    }

    // Simulasi buat link pembayaran (bisa integrasi ke Midtrans, Xendit, dsb)
    const paymentLink = `https://payment-gateway.com/pay/${orderId}`;

    // update order dengan channel pembayaran
    order.payment_channel = paymentChannel;
    await order.save();

    return { orderId, paymentChannel, paymentLink };
  } catch (err) {
    Logger.log([logName, "Create Payment", "ERROR"], {
      message: `${err}`,
    });
    throw err;
  }
};

// Menerima callback dari payment gateway
const paymentCallbackService = async (payload) => {
  try {
    const { orderId, status } = payload;

    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new createError("Order tidak ditemukan", StatusCodes.NOT_FOUND);
    }

    // update status order sesuai callback
    order.status = status;
    await order.save();

    return order;
  } catch (err) {
    Logger.log([logName, "Payment Callback", "ERROR"], {
      message: `${err}`,
    });
    throw err;
  }
};

module.exports = {
  addToCartService,
  removeFromCartService,
  checkoutCartService,
  createPaymentService,
  paymentCallbackService
};
