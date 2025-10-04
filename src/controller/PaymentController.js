const { StatusCodes } = require("http-status-codes");
const { createPaymentService, paymentCallbackService } = require("../services/paymentService");
const Logger = require("../helpers/logger");

const logName = "API Payment";

const createPayment = async (request, reply) => {
  try {
    const { orderId, paymentChannel } = request.body;
    const result = await createPaymentService(orderId, paymentChannel);

    return reply
      .status(StatusCodes.OK)
      .send({
        responseCode: StatusCodes.OK,
        responseDesc: "Link pembayaran berhasil dibuat",
        data: result
      });
  } catch (err) {
    Logger.log([logName, "POST Create Payment", "ERROR"], { message: `${err}` });
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    return reply
      .status(statusCode)
      .send({
        responseCode: statusCode,
        responseDesc: err.message || "Terjadi kesalahan pada server"
      });
  }
};

const paymentCallback = async (request, reply) => {
  try {
    const order = await paymentCallbackService(request.body);

    return reply
      .status(StatusCodes.OK)
      .send({
        responseCode: StatusCodes.OK,
        responseDesc: "Callback berhasil diproses",
        data: order
      });
  } catch (err) {
    Logger.log([logName, "POST Payment Callback", "ERROR"], { message: `${err}` });
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
  createPayment,
  paymentCallback
};