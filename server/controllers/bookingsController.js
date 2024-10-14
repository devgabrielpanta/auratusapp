import * as bookingsModel from "../models/bookingsModel.js";

// exemplo de como usar import/export
const getAllBookings = async (req, res) => {
  console.log("função getAllBookings iniciada no servidor");
  try {
    const bookings = await bookingsModel.getAll();
    console.log("resultado da variável bookings no servidor: " + bookings);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).send(`Erro ao buscar a lista de reservas: ${err}`);
    // o erro não pode ser enviado diretamente para o cliente
    // o ideal é tratar o erro e enviar uma mensagem amigável e padronizada
  }
};

const createBooking = async (req, res) => {
  try {
    const newBooking = req.body;
    // falha de segurança grave: o usuário pode enviar qualquer campo no corpo da requisição
    // o ideal é validar os campos antes de inserir no banco
    await bookingsModel.create(newBooking);
    res.status(200).send("Reserva criada com sucesso");
    // as resposta de criação com sucesso devem ser 201
    // a resposta deve conter a reserva criada
  } catch (err) {
    res.status(500).send(`Erro ao criar a reserva: ${err}`);
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    // falha de segurança grave: o usuário pode enviar qualquer campo no corpo da requisição
    const updateBooking = req.body;
    await bookingsModel.update(id, updateBooking);
    res.status(200).send("Reserva atualizada com sucesso");
  } catch (err) {
    res.status(500).send("Erro ao atualizar a reserva: ", err);
  }
};

export { getAllBookings, createBooking, updateBooking };
