//models
import * as authModels from "../models/authModels.js";
//Firebase
import axios from "axios";
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { auth } from "../firebase.js";
import serviceAccount from "../firebase-credential.json" assert { type: "json" };
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { signInWithEmailAndPassword } from "firebase/auth";


//código do firebase-api para limpar e revisar
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const api_key = process.env.FIREBASE_APIKEY;

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
    const email = req.body.email;
    const pass = req.body.pass;

    if(!email || !pass) {
        return res.status(400).send("Email/Senhal inválidos");
    }

    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            return res.status(201).send({token: userCredential.user.accessToken});
        })
        .catch((error) => {
            return res.status(400).send("Email/Senhal inválidos");
        });
};