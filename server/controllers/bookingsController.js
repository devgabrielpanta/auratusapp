const bookingsModel = require('../models/bookingsModel');

exports.getAllBookings = async (req, res) => {
    console.log('função getAllBookings iniciada no servidor');
    try {
        const bookings = await bookingsModel.getAll();
        console.log('resultado da variável bookings no servidor: ' + bookings);
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).send(`Erro ao buscar a lista de reservas: ${err}`);
    };
};

exports.createBooking = async (req,res) => {
    try {
        const newBooking = req.body;
        await bookingsModel.create(newBooking);
        res.status(200).send('Reserva criada com sucesso');
    } catch (err) {
        res.status(500).send(`Erro ao criar a reserva: ${err}`);
    };
};

exports.updateBooking = async (req, res) => {
    try {
        const {id} = req.params;
        const updateBooking = req.body;
        await bookingsModel.update(id, updateBooking);
        res.status(200).send('Reserva atualizada com sucesso');
    } catch (err) {
        res.status(500).send('Erro ao atualizar a reserva: ', err);
    };

};