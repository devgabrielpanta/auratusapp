import axios from "axios";
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from "../firebase-credential.json" assert { type: "json" };
import * as authModels from "../models/authModels.js";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const api_key = process.env.FIREBASE_APIKEY;

// Sign in with email / password: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
export const signInWithEmail = async (email, pass) => {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`;

    axios.post(endpoint, {
        email: email,
        password: pass,
        returnSecureToken: true
    })
    .then((response) => {
        const idToken = response.data.idToken;
        const refreshToken = response.data.refreshToken;
        const uid = response.data.localId;
        
        authModels.setSignInTokens(idToken, refreshToken, uid)
            .then (() => {
                return idToken
            })
            .catch((error) => {
                throw error;
            })
    })
    .catch((error) => {
        throw error;
    })
};

export const verifyToken = async (idToken) => {
    getAuth().verifyIdToken(idToken)
        .then((decodedToken) => {
            return decodedToken;
        })
        .catch((error) => {
            throw new Error(error.message);
        })
};

// Exchange a refresh token for an ID token: https://firebase.google.com/docs/reference/rest/auth#section-refresh-token
export const updateIdToken = async (refreshToken, next) => {
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
                return idToken
            })
            .catch((error) => {
                throw error.message;
            })
    })
    .catch((error) => {
        throw error.message;
    })
};
