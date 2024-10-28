import pool from "../db.js";
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"

const db = pool;

const dbName = process.env.DB_DBNAME;

const closeDb = () => {
  db.end((err) => {
    if (err) {
      console.log("Erro ao encerrar a conexão:", err);
    } else {
      console.log("Conexão com o banco encerrada");
    }
  });
};

// (C)reate bookings:
const create = (bookingData) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        return;
      }
      const query = `INSERT INTO ${dbName} 
      (guest_name, guest_count, booking_time, guest_phone, guest_mail, booking_status, booking_source, service)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      
      dayjs.extend(customParseFormat);
      const bookingTime =
      dayjs(bookingData.booking_time, "DD/MM/YYYY HH:mm")
      .set("second", 0)
      .format("YYYY-MM-DD HH:mm:ss");
      
      const values = [
        bookingData.guest_name,
        bookingData.guest_count,
        bookingTime,
        bookingData.guest_phone,
        bookingData.guest_mail,
        bookingData.status,
        bookingData.booking_source,
        bookingData.service,
      ];

      db.query(query, values, (err, result) => {
      if (err) reject(err);
      resolve({
      id: result.insertId,
      ...bookingData
      });
      });

      connection.release();

    });
  });
};

// (R)ead bookings:
const getAll = async () => {
  const query = `SELECT * FROM ${dbName}`;

  try {
    const [result] = await db.promise().query(query);
    return result;

  } catch (err) {
    console.error("Erro ao executar a função getAll: ", err);
    throw err;
  }
};

// (U)pdate bookings:
const update = (id, bookingData) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        return;
      }

      const setFields =
      "guest_name = ?, guest_count = ?, booking_time = ?, guest_phone = ?, guest_mail = ?, booking_status = ?, booking_source = ?, service = ?";
      const query = `UPDATE ${dbName} SET ${setFields} WHERE id = ?`;
      const values = [...Object.values(bookingData), id];

      db.query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(bookingData);
      });
      
      connection.release();
    });
  });
};

export default { create, getAll, update };