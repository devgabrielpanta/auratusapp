import axios from 'axios';
import { decode } from "jsonwebtoken";
import { setLoginTokens, getUserByEmail } from "../models/authModel.js";
//firebase web
import { webAuth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
//firebase admin
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import serviceAccount from "../firebase-credential.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const verifyToken = async (token) => {
    try {
        const userCredentials = await getAuth().verifyIdToken(token);
        return userCredentials.email;
    } catch (error) {
        throw new Error(error);
    }
};

export const handleLogin = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    if(!email || !pass) {
        return res.status(400).send("Email/Senha inválidos");
    }
    signInWithEmailAndPassword(webAuth, email, pass)
        .then((userCredential) => {
            const refresh_token = userCredential._tokenResponse.refreshToken;
            const uid = userCredential._tokenResponse.localId;
            const id_token = userCredential._tokenResponse.idToken;
            setLoginTokens(refresh_token, uid)
            return res.status(201).send({token: id_token});
        })
        .catch((error) => {
            return res.status(400).send("Email/Senha inválidos");
        });
};

export const updateToken = async (req, res) => {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Bearer token was not provided" });
    }
    const actualToken = authorization.split("Bearer ")?.[1];
    try {
        const userMail = await verifyToken(actualToken);
        const userCredential = await getUserByEmail(userMail);
        const refreshToken = userCredential.firebase_token;
        const endpoint = process.env.FIREBASE_REFRESHENDPOINT;
        const response = await axios.post(endpoint, {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        });
        return res.status(201).send({token: response.data.id_token});
    } catch (error) {
        return res.status(403).json({ message: "Não foi possível atualizar o token de acesso" });
    }
};