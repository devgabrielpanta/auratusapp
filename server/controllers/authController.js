import authModels from "../models/authModels.js";
import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app'
import { auth } from "../firebase.js"
import { getAuth } from 'firebase-admin/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import serviceAccount from "../firebase-credential.json" assert { type: "json" };
import bcrypt from "bcrypt";
import dayjs from "dayjs"

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

        try {       
            if (userRecord.uid === userId) {
                try {
                    const customToken = await getAuth().createCustomToken(userId);
                    return customToken

                } catch (error) {
                    console.error("Erro ao gerar um novo token personalizado: ", error)
                    throw error;
                };
                
            } else {
                throw new Error("ID do usuário inválido");
            }

        } catch (error) {
            console.error("Erro ao criar o token personalizado:", error);
            throw error;
        }

    } catch (error) {
        console.error("Não foi possível localizar esse usuário");
        throw error;
    }

};

const refreshToken = async (uid) => {
    try {
        const newToken = await generateToken(uid);
        const newExpiration = dayjs().add(1, "hour").format("YYYY-MM-DD HH:mm:ss");
        
        try {
            const setToken = await authModels.updateToken(uid, newToken, newExpiration);
            return newToken;
        } catch (error) {
            console.error("token gerado com sucesso mas houve um problema na atualização do banco: ", error);
            throw error;
        }
        
    } catch (error) {
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

export const authValidation = async (req,res) => {
    
};


export const handleLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.pass;

        //check if the email is valid
        const userData = await authModels.getUserByEmail(email);
        if (!userData || userData.length === 0) {
            return res.status(404).send("Usuário não encontrado");
        }

        //check if the password is valid
        const validPass = await bcrypt.compare(pass, userData[0].pass)

        if (validPass) {
            const tokenValid = dayjs(userData[0].auth_time).isAfter(dayjs());
            
            if (!tokenValid) {
                refreshToken(userData[0].uid)
                    .then((newToken) => {
                        return res.status(200).send(newToken);
                    })
                    .catch((error) => {
                        return res.status(500).send(`Erro ao gerar um novo token de acesso: ${error.message}`);
                    });
            } else {
                return res.status(200).send(userData[0].access_token);
            }
        } else {
            return res.status(401).send("Senha incorreta");
        }
    } catch (error) {
        console.error("Erro no processo de autenticação :", error);
        return res.status(500).send(`Erro no processo de autenticação: ${error.message}`);
    }
};