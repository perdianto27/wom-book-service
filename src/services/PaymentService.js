const { StatusCodes } = require("http-status-codes");
const { Order } = require("../models");
const createError = require("../utils/customError");
const Logger = require("../helpers/logger");

const logName = "Payment Service";

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
    const paymentGatewayResponse = {
      reference: `INV-${Date.now()}`, // biasanya ini dari gateway
      link: `https://payment-gateway.com/pay/${orderId}`
    };


    // update order dengan channel pembayaran
    order.payment_channel = paymentChannel;
    order.payment_reference = paymentGatewayResponse.reference;
    await order.save();

    return { 
      orderId, 
      paymentChannel, 
      paymentReference: paymentGatewayResponse.reference,
      paymentLink: paymentGatewayResponse.link
    };
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
    order.status = status; // contoh: "paid", "failed", "expired"
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
  createPaymentService,
  paymentCallbackService
};