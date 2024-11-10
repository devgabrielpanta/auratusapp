import bookingsModel from "../models/bookingsModel.js";

// exemplo de como usar import/export
const getAllBookings = async (req, res) => {
  res.status(200).send(req.body);
  /**
  console.log("função getAllBookings iniciada no servidor");
  try {
    const bookings = await bookingsModel.getAll();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).send(`Erro ao buscar a lista de reservas: ${err}`);
    // o erro não pode ser enviado diretamente para o cliente
    // o ideal é tratar o erro e enviar uma mensagem amigável e padronizada
    // gps: estou enviando o erro para visualizar o problema, para produção pensei em criar um log de auditoria. 
  }
  */
};

const createBooking = async (req, res) => {
  try {
    const newBooking = req.body;
    // falha de segurança grave: o usuário pode enviar qualquer campo no corpo da requisição
    // o ideal é validar os campos antes de inserir no banco
    // gps: implementar as validações após com o Zod para teste de produção.
    const newBookingData = await bookingsModel.create(newBooking);
    res.status(201).json({
      message: "Reserva criada com sucesso",
      booking: newBookingData
    });
    // a resposta deve conter a reserva criada
    //gps: no frontend eu altero o useState para loading, o que executa a função de getAllBookings e trás a reserva nova para as views, como melhorar?
  } catch (err) {
    res.status(500).send(`Erro ao criar a reserva: ${err}`);
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    // falha de segurança grave: o usuário pode enviar qualquer campo no corpo da requisição
    const updateBooking = req.body;
    const newBookingData = await bookingsModel.update(id, updateBooking);
    res.status(201).json({
      message: "Reserva atualizada com sucesso",
      booking: newBookingData
    });
  } catch (err) {
    res.status(500).send("Erro ao atualizar a reserva: ", err);
  }
};

export { getAllBookings, createBooking, updateBooking };