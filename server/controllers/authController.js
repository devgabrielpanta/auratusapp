//models
import * as authModels from "../models/authModels.js";
//Firebase
import { signInWithEmail, updateIdToken, verifyToken } from "../middlewares/firebase-api.js";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export const authValidation = async (req, res) => {
    const email = req.cookies.user;
    const idToken = req.cookies.id_token;
    
    if(!idToken || !email) {
        return res.status(401).send("Credenciais de acesso inválidas");
    }

    const userCredentials = await authModels.getUserByEmail(email);
    if(!userCredentials || userCredentials.id_token != idToken){
        return res.status(401).send("Credenciais de acesso inválidas");
    }

    if(dayjs(userCredentials.token_expiration).isAfter(dayjs())) {
        verifyToken(idToken)
            .then(() => {
                return res.status(200).send({user: email});
            })
            .catch((error) => {
                return res.status(401).send(`Não foi possível validar o acesso: ${error.message}`);
            })
    } else {
        updateIdToken(userCredentials.refresh_token)
            .then((newIdToken) => {
                res.cookie("id_token", newIdToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                    sameSite: "Strict",
                });
                res.cookie("user", email, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                    sameSite: "Strict",
                });
                return res.status(200).send({user: email});
            })
            .catch((error) => {
                return res.status(401).send(`Não foi possível validar o acesso: ${error.message}`);
            })
    }
};

export const handleLogin = async (req, res) => {
    try {
        // #1 check if the login was from a valid user on database
        const email = req.body.email;
        const pass = req.body.pass;
        //proceed if the email is valid
        const userData = await getUserByEmail(email);
        if (!userData || userData.length === 0) {
            return res.status(400).send("Email inválido");
        };
        //proceed if the password is valid
        const validPass = await bcrypt.compare(pass, userData[0].pass);
        if (!validPass) {
            return res.status(400).send("Senha incorreta");
        };

        signInWithEmail(email, pass)
            .then((idToken) => {
                res.cookie("id_token", idToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                    sameSite: "Strict",
                });
                res.cookie("user", email, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                    sameSite: "Strict",
                });
                return res.status(201).send("Login realizado com sucesso");
            })
            .catch((error) => {
                return res.status(500).send(`Não foi possível processar a solicitação: ${error.message}`);
            })

    } catch (error) {
        return res.status(500).send(`Erro no processo de autenticação: ${error.message}`);
    }
};