import pool from "../db.js";

const db = pool;
const dbName = process.env.DB_USERS;

export const getUserByEmail = async (email) => {

    const query = `SELECT * FROM ${dbName} WHERE email = "${email}"`;

    try {
        const [result] = await db.promise().query(query);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }    
};

export const setLoginTokens = async (refresh_token, uid) => {
    const fields = "firebase_token = ?";
    const query = `UPDATE ${dbName} SET ${fields} WHERE firebase_id = "${uid}"`;

    const values = [refresh_token];

    db.promise().query(query, values)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.log("Erro ao atualizar os Tokens: ", error);
            throw new Error(error.message);
        })
};