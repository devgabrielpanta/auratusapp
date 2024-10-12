const db = require('../db');

const bookingColumns = 'guest_name, guest_count, booking_time, guest_phone, guest_mail, booking_status, booking_source'

const dbName = 'auratusp_martech.bookings'

const closeDb = () => {
    db.end(err => {
        if (err) {
            console.log('Erro ao encerrar a conexão:', err);
        } else {
            console.log('Conexão com o banco encerrada');
        }
    });
};


// (C)reate bookings:
exports.create = (bookingData) => {
    return new Promise((resolve,reject) => {
        const query = `INSERT INTO ${dbName} (${bookingColumns}) VALUES (?, ?, ?, ?, ?, ?, ?)`
        const values = Object.values(bookingData);

        db.query(query, values, (err,result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// (R)ead bookings:
exports.getAll = () => {
    return new Promise((resolve,reject) => {
        const query = `SELECT * FROM ${dbName}`;

        db.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });

        closeDb();
    })
};

// (U)pdate bookings:
exports.update = (id, bookingData) => {
    return new Promise((resolve, reject) => {
        const setFields = 'guest_name = ?, guest_count = ?, booking_time = ?, guest_phone = ?, guest_mail = ?, booking_status = ?, booking_source = ?'
        const query = `UPDATE ${dbName} SET ${setFields} WHERE id = ?`;
        const values = [...Object.values(bookingData), id];

        db.query(query, values, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};