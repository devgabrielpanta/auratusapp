import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app'
import { auth } from "../firebase.js"
import { getAuth } from 'firebase-admin/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import serviceAccount from "../firebase-credential.json" assert { type: "json" };
import bcrypt from "bcrypt";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Usar o código a seguir para encryptar a pass no react
// https://kennethscoggins.medium.com/how-to-use-mysql-password-encryption-with-nodejs-express-and-bcrypt-ad9ede661109
/** 
const saltRounds = 10;
const encryptedPassword = await bcrypt.hash(pass, saltRounds);
*/

const generateToken = async (userId) => {
    try {
        const userRecord = await getAuth().getUser(userId);

        if (userRecord.uid === userId) {
            const customToken = await getAuth().createCustomToken(userId);
            return customToken
        } else {
            throw new Error("ID do usuário inválido");
        }
    } catch (error) {
        console.error("Erro ao criar o token personalizado:", error);
        throw error;
    }
};

const userRecords = async (userId) => {
    return getAuth()
        .getUser(userId)
        .then((userRecord) => {
            return userRecord
        })
        .catch((error) => {
            console.error(error);
            return "invalid userId"
        });
};

export const handleLogin = async (req, res) => {

    const uid = req.body.uid;
    const email = req.body.email;
    const pass = req.body.pass;

    generateToken(uid)
        .then((userToken) => {
            console.log(userToken);
            res.status(202).send(userToken);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).send("Usuário inválido");
        })
};