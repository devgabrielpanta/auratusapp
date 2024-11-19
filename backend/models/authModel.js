import pool from "../db.js";
//ambiente
import dotenv from "dotenv";
dotenv.config();

const db = pool;
const dbName = process.env.DB_USERS;


export const getUserByEmail = async (email) => {
    const query = `SELECT * FROM ${dbName} WHERE email = "${email}"`;
    const [result] = await db.promise().query(query);
    return result[0];
};

export const setLoginTokens = async (refresh_token, uid) => {
    const fields = "firebase_token = ?";
    const query = `UPDATE ${dbName} SET ${fields} WHERE firebase_id = "${uid}"`;

    const values = [refresh_token];
    const result = await db.promise().query(query, values);
    return result[0].changedRows //1 or 0 
};