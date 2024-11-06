import pool from "../db.js";
import dayjs from "dayjs"

const db = pool;

const dbName = process.env.DB_DBNAME_AUTH;

export const getUserByEmail = async (email) => {

    const query = `SELECT * FROM ${dbName} WHERE email = "${email}"`;

    try {
        const [result] = await db.promise().query(query);

        if (result.length === 1 && result[0].email === email) {
            return result;
        } else {
            throw new Error("Login inválido");
        }
    } catch (error) {
        throw new Error(error.message);
    }    
};

export const setSignInTokens = async (idToken, refreshToken, uid) => {
    const fields = "refresh_token = ?, id_token = ?, last_login = ?, token_expiration = ?";
    const query = `UPDATE ${dbName} SET ${fields} WHERE uid = "${uid}"`;

    const loginDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const tokenExpiration = dayjs(loginDate).add(1, "hour").format("YYYY-MM-DD HH:mm:ss");

    const values = [refreshToken, idToken, loginDate, tokenExpiration];

    db.promise().query(query, values)
        .then(() => {
            return idToken;
        })
        .catch((error) => {
            console.log("Erro ao atualizar os tokens de login: ", error);
            throw new Error(error.message);
        })
};

export const setIdToken = async (idToken, uid) => {
    const fields = "id_token = ?";
    const query = `UPDATE ${dbName} SET ${fields} WHERE uid = "${uid}"`;

    const values = [idToken];

    db.promise().query(query, values)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.log("Erro ao atualizar o ID Token: ", error);
            throw new Error(error.message);
        })
};