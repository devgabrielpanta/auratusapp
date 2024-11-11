import bookingsModel from "../models/bookingsModel.js";

const getAllBookings = async (req, res) => {
  const user = req.body.user;
  if (!user) {
    return res.status(403).send({message: "Autentique a sessão antes de acessar as reservas"});
  }
  try {
    const bookings = await bookingsModel.getAll(user);
    const response = { bookings: bookings };
    if (res.locals.newIdToken) {
      response.newIdToken = res.locals.newIdToken;
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send(`Erro ao buscar a lista de reservas: ${err}`);
    // o erro não pode ser enviado diretamente para o cliente
    // o ideal é tratar o erro e enviar uma mensagem amigável e padronizada
    // gps: estou enviando o erro para visualizar o problema, para produção pensei em criar um log de auditoria. 
  }
};

const createBooking = async (req, res) => {
  const user = req.body.user;
  if (!user) {
    return res.status(403).send({message: "Autentique a sessão antes de acessar as reservas"});
  }
  try {
    const newBooking = req.body.bookings;
    // falha de segurança grave: o usuário pode enviar qualquer campo no corpo da requisição
    // o ideal é validar os campos antes de inserir no banco
    // gps: implementar as validações após com o Zod para teste de produção.
    const newBookingData = await bookingsModel.create(newBooking, user);
    const response = {
      message: "Reserva criada com sucesso",
      booking: newBookingData,
    };
    if (res.locals.newIdToken) {
      response.newIdToken = res.locals.newIdToken;
    };
    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(`Erro ao criar a reserva: ${err}`);
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    // falha de segurança grave: o usuário pode enviar qualquer campo no corpo da requisição
    // futuramente adicionar um filtro para ver se o usuário está editando a sua própria reserva
    const updateBooking = req.body.bookings;
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