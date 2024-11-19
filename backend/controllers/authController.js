/**
import axios from 'axios';
import { setLoginTokens, getUserByEmail } from "../models/authModel.js";
//firebase web
import { webAuth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
//firebase admin
import { getAuth } from 'firebase-admin/auth';


export const handleLogin = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    if(!email || !pass) {
        return res.status(400).send("Email/Senha inválidos");
    }
    try {
        const userCredential = await signInWithEmailAndPassword(webAuth, email, pass);
        const refresh_token = userCredential._tokenResponse.refreshToken;
        const uid = userCredential._tokenResponse.localId;
        const id_token = userCredential._tokenResponse.idToken;
        const affectedUser = await setLoginTokens(refresh_token, uid);
        if (affectedUser < 1) {
            return res.status(502).json({ message: "Usuário não localizado" });
        } else {
            return res.status(201).send({token: id_token});
        }
    } catch (error) {
        return res.status(400).json({ message: "Email/Senha inválidos" });
    }
};

export const refreshToken = async (req, res) => {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Bearer token was not provided" });
    }
    const actualToken = authorization.split("Bearer ")?.[1];
    console.log(`actualToken: ${actualToken}`);
    try {
        const verifiedToken = await getAuth().verifyIdToken(actualToken);
        const userCredential = await getUserByEmail(verifiedToken.email);
        const refresh_token = userCredential.firebase_token;
        if(!userCredential || !refresh_token) {
            return res.status(403).json({ message: "Usuário não localizado" });
        }
        const endpoint = process.env.FIREBASE_REFRESHENDPOINT;
        const response = await axios.post(endpoint, {
            grant_type: "refresh_token",
            refresh_token: refresh_token
        });
        return res.status(201).send({token: response.data.id_token});
    } catch (error) {
        return res.status(403).json({ message: "Não foi possível atualizar o token de acesso" });
    }
};
 */
import { signInWithEmailAndPassword } from "firebase/auth";
import { webAuth } from "../firebase.js";
//ambiente
import dotenv from "dotenv";
dotenv.config();

export const handleLogin = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    if(!email || !pass) {
        return res.status(400).send("Email/Senha inválidos");
    }
    try {
        const authDomain = process.env.FIREBASE_AUTHDOMAIN;
        const projectId = process.env.FIREBASE_PROJECTID;
        const storageBucket = process.env.FIREBASE_STORAGEBUCKET;
        const messagingSenderId = process.env.FIREBASE_MESSAGINGSENDERID;
        const appId = process.env.FIREBASE_APPID;
        //const userCredential = await signInWithEmailAndPassword(webAuth, email, pass);
        return res.status(200).json({ 
            authDomain: process.env.FIREBASE_AUTHDOMAIN,
            projectId: process.env.FIREBASE_PROJECTID,
            storageBucket: process.env.FIREBASE_STORAGEBUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
            appId: process.env.FIREBASE_APPID,
        });
    } catch (error) {
        return res.status(400).json({ message: "Email/Senha inválidos" });
    }
};

export const refreshToken = async (req, res) => {
    res.status(200).send("iniciando a função de refreshToken");
};
