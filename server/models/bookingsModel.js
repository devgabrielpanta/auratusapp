import pool from "../db.js";
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"

const db = pool;

const dbName = process.env.DB_BOOKINGS;
const dbUsers = process.env.DB_USERS;
const dbRestaurants = process.env.DB_RESTAURANTS;

const getRestaurantId = async (uid) => {
  const query =
  `SELECT r.id AS restaurant_id
  FROM ${dbRestaurants} r
  JOIN ${dbUsers} u ON r.user_id = u.id
  WHERE u.firebase_id = "${uid}"`;
  
  try {
    const [restaurants] = await db.promise().query(query);
    return restaurants[0].restaurant_id;
  } catch (error) {
    throw new Error("Não foi possível obter o id do restaurante");
  }
}


// (C)reate bookings:
const create = async (bookingData, user) => {
  const query = `INSERT INTO ${dbName} 
      (guest_name, guest_count, booking_time, guest_phone, guest_mail, booking_status, booking_source, service, restaurant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  dayjs.extend(customParseFormat);
  const bookingTime = dayjs(bookingData.booking_time, "DD/MM/YYYY HH:mm")
    .set("second", 0)
    .format("YYYY-MM-DD HH:mm:ss");
  
  try {
  
    const restaurantId = await getRestaurantId(user);
    
    const values = [
      bookingData.guest_name,
      bookingData.guest_count,
      bookingTime,
      bookingData.guest_phone,
      bookingData.guest_mail,
      bookingData.booking_status,
      bookingData.booking_source,
      bookingData.service,
      restaurantId,
    ];

    const [result] = await db.promise().query(query, values);

    return {
      id: result.insertId,
      guest_name: bookingData.guest_name,
      guest_count: bookingData.guest_count,
      booking_time: bookingTime,
      guest_phone: bookingData.guest_phone,
      guest_mail: bookingData.guest_mail,
      booking_status: bookingData.booking_status,
      booking_source: bookingData.booking_source,
      service: bookingData.service,
    };
  } catch (err) {
    console.log("Erro ao criar uma nova reserva: ", err);
    throw err;
  }
};

// (R)ead bookings:
const getAll = async (user) => {
  const query =
  `SELECT b.id, guest_name, guest_count, booking_time, guest_phone, guest_mail, booking_status, booking_source, service
  FROM ${dbName} b
  JOIN ${dbRestaurants} r ON b.restaurant_id = r.id
  JOIN ${dbUsers} u ON r.user_id = u.id
  WHERE u.firebase_id = "${user}"`;

  try {
    const [result] = await db.promise().query(query);
    return result;

  } catch (err) {
    console.error("Erro ao executar a função getAll: ", err);
    throw err;
  }
};

// (U)pdate bookings:
const update = async (id, bookingData) => {
  const setFields =
  "guest_name = ?, guest_count = ?, booking_time = ?, guest_phone = ?, guest_mail = ?, booking_status = ?, booking_source = ?, service = ?";
  const query = `UPDATE ${dbName} SET ${setFields} WHERE id = ${id}`;

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
    bookingData.booking_status,
    bookingData.booking_source,
    bookingData.service
  ]

  try {
    const [result] = await db.promise().query(query, values);
    return {
      id: id,
      guest_name: bookingData.guest_name,
      guest_count: bookingData.guest_count,
      booking_time: bookingTime,
      guest_phone: bookingData.guest_phone,
      guest_mail: bookingData.guest_mail,
      booking_status: bookingData.booking_status,
      booking_source: bookingData.booking_source,
      service: bookingData.service,
    }
  } catch (err) {
    console.error("Erro ao executar a função update: ", err)
    throw err;
  }
};

export default { create, getAll, update };