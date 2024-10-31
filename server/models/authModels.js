import pool from "../db.js";
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"

const db = pool;

const dbName = process.env.DB_DBNAME_AUTH;

const getUserByEmail = async (email) => {

    const query = `SELECT * FROM ${dbName} WHERE email = "${email}"`;

    try {
        const [result] = await db.promise().query(query);

        if (result.length === 1 && result[0].email === email) {
            return result;
        } else {
            console.error("Falha na autenticação do email");
            throw new Error("Email não autorizado");
        }
    } catch (error) {
        console.error("Falha na autenticação do email: ", error);
        throw error;
    }    
};

const updateToken = async (uid, access_token, auth_time) => {

    const fields = "access_token = ?, auth_time = ?";
    const query = `UPDATE ${dbName} SET ${fields} WHERE uid = "${uid}"`;
    const values = [access_token, auth_time];

    try {
        const [result] = await db.promise().query(query, values)
        return result
    } catch (error) {
        console.log("Erro ao atualizar o access_token: ", error);
        throw error
    }
}


export default { getUserByEmail, updateToken };