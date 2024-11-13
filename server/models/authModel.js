import pool from "../db.js";

const db = pool;
const dbName = process.env.DB_USERS;

export const getUserByEmail = async (email) => {

    const query = `SELECT * FROM ${dbName} WHERE email = "${email}"`;

    try {
        const [result] = await db.promise().query(query);
        return result[0].firebase_token;
    } catch (error) {
        throw new Error(error.message);
    }    
};

export const setFirebaseToken = async (refresh_token, id_token, uid) => {
    const fields = "firebase_token = ?, prev_firebase_token = ?";
    const query = `UPDATE ${dbName} SET ${fields} WHERE firebase_id = "${uid}"`;

    const values = [refresh_token, id_token];

    db.promise().query(query, values)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.log("Erro ao atualizar o ID Token: ", error);
            throw new Error(error.message);
        })
};