const { StatusCodes } = require('http-status-codes');

const { Book } = require("../models");

const Logger = require('../helpers/logger');
const { ROLE } = require('../helpers/constant');

const { Op, where } = require('sequelize');

const logName = 'API Book';

const postBook = async (request, reply) => {
  try {

    await Book.create(request.body)

    return reply
    .status(StatusCodes.CREATED)
    .send({
      responseCode: StatusCodes.CREATED,
      responseDesc: "Data berhasil disimpan"
  });
  } catch (err) {
    Logger.log([logName, 'POST Book', 'ERROR'], {
      message: `${err}`,
    });
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
        responseDesc: "Data gagal disimpan"
    });
  }
};


const getBooks = async (request, reply) => {
  try {
    const { roleId } = request.user;
    
    let where = { is_active: true };
    if (roleId === ROLE.ID.CUSTOMER) {
      where = { stock: { [Op.gt]: 0 }, is_active: true };
    }

    const books = await Book.findAll({ where });
    const mappedBooks = books.map((p) => {
      const plain = p.get({ plain: true });
      return {
        ...plain
      };
    });

    return reply
    .status(StatusCodes.OK)
    .send({
      responseCode: StatusCodes.OK,
      responseDesc: "Berhasil mengambil data",
      data: mappedBooks
  });
  } catch (err) {
    Logger.log([logName, 'GET Books', 'ERROR'], {
      message: `${err}`,
    });
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
        responseDesc: "Gagal mengambil data"
    });
  }
};


const getBookById = async (request, reply) => {
  try {
    const bookId = request.params.id
    const book = await Book.findByPk(bookId);

    if (!book) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        responseCode: StatusCodes.NOT_FOUND,
        responseDesc: "Buku tidak ditemukan"
      });
    }

    const bookDetail = {
      ...book.toJSON(),
      price: Math.floor(book.price)
    };

    return reply.status(StatusCodes.OK).send({
      responseCode: StatusCodes.OK,
      responseDesc: "Berhasil mengambil data",
      data: bookDetail
    });
  } catch (error) {
    Logger.log([logName, 'GET book by ID', 'ERROR'], { message: `${error}` });
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
      responseDesc: "Gagal mengambil data"
    });
  }
};


const deleteBookById = async (request, reply) => {
  try {
    const bookId = request.params.id;
    const book = await Book.findByPk(bookId);

    if (!book) {
      return reply.status(StatusCodes.NOT_FOUND).send({
        responseCode: StatusCodes.NOT_FOUND,
        responseDesc: "Buku tidak ditemukan"
      });
    }

    await Book.update(
      { is_active: false },
      { where: { id: bookId } }
    );

    return reply.status(StatusCodes.OK).send({
      responseCode: StatusCodes.OK,
      responseDesc: "Data berhasil dihapus"
    });
  } catch (error) {
    Logger.log([logName, "DELETE book by ID", "ERROR"], { message: `${error}` });
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
      responseDesc: "Gagal menghapus data"
    });
  }
};

module.exports = {
  postBook,
  getBooks,
  getBookById,
  deleteBookById
};