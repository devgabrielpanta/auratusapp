//models
import * as authModels from "../models/authModels.js";
//Firebase
import axios from "axios";
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from "../firebase-credential.json" assert { type: "json" };
import bcrypt from "bcrypt";
import dayjs from "dayjs";


//código do firebase-api para limpar e revisar
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const api_key = process.env.FIREBASE_APIKEY;

// Sign in with email / password: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
const signInWithEmail = async (email, pass) => {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`;
    try {
        const response = await axios.post(endpoint, {
            email: email,
            password: pass,
            returnSecureToken: true
        });
        const idToken = response.data.idToken;
        const refreshToken = response.data.refreshToken;
        const uid = response.data.localId;
        const setToken = await authModels.setSignInTokens(idToken, refreshToken, uid);
        return idToken
    } catch (error) {
        throw new Error(error.message);
    }
};

const verifyToken = async (idToken) => {
    getAuth().verifyIdToken(idToken)
        .then((decodedToken) => {
            return decodedToken;
        })
        .catch((error) => {
            throw new Error(error.message);
        })
};

// Exchange a refresh token for an ID token: https://firebase.google.com/docs/reference/rest/auth#section-refresh-token
const updateIdToken = async (refreshToken, next) => {
    const endpoint = `https://securetoken.googleapis.com/v1/token?key=${api_key}`;

    axios.post(endpoint, {
        grant_type: "refresh_token",
        refresh_token: refreshToken
    })
    .then((response) => {
        const idToken = response.data.id_token;
        const uid = response.data.user_id;
        authModels.setIdToken(idToken, uid)
            .then(() => {
                return idToken;
            })
            .catch((error) => {
                throw new Error(error.message);
            })
    })
    .catch((error) => {
        throw new Error(error.message);
    })
};

export const authValidation = async (req, res) => {
    const email = req.cookies.user;
    const idToken = req.cookies.id_token;
    
    if(!idToken || !email) {
        return res.status(401).send({ error: "email e/ou token de acessos inválidos" });
    }

    try {
        const userCredentials = await authModels.getUserByEmail(email);
        if(!userCredentials || userCredentials[0].id_token != idToken) {
            return res.status(401).send({ error: "credenciais de acesso inconsistentes"});
        }
    
        if(dayjs(userCredentials[0].token_expiration).isAfter(dayjs())) {
            verifyToken(idToken)
                .then(() => {
                    return res.status(200).send({user: email});
                })
                .catch((error) => {
                    return res.status(401).send({ error: `não foi possível verificar o token de acesso: ${error.message}`});
                })
        } else {
            updateIdToken(userCredentials[0].refresh_token)
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
                    return res.status(401).send({ error: `não foi possível atualizar o token de acesso: ${error.message}`});
                })
        }  
    } catch (error) {
        return res.status(401).send({ error: `não foi possível validar o acesso: ${error.message}`});
    }
};

export const handleLogin = async (req, res) => {
    try {
        // #1 check if the login was from a valid user on database
        const email = req.body.email;
        const pass = req.body.pass;
        //proceed if the email is valid
        const userData = await authModels.getUserByEmail(email);
        if (!userData || userData.length === 0) {
            return res.status(400).send("Email inválido");
        };
        //proceed if the password is valid
        const validPass = await bcrypt.compare(pass, userData[0].pass);
        if (!validPass) {
            return res.status(400).send("Senha incorreta");
        };

        const idToken = await signInWithEmail(email, pass);
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
        return res.status(201).send({
            user: email,
            message: "Login realizado com sucesso"
        });
    } catch (error) {
        return res.status(500).send(`${error.message}`);
    }
};