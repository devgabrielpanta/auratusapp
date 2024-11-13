import axios from 'axios';
//firebase web
import { webAuth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setLoginTokens, getUserByEmail, updateIdToken } from "../models/authModel.js";

const api_key = process.env.FIREBASE_APIKEY;

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
            setLoginTokens(refresh_token, id_token, uid)
            return res.status(201).send({token: id_token});
        })
        .catch((error) => {
            return res.status(400).send("Email/Senha inválidos");
        });
};

// Exchange a refresh token for an ID token:
export const updateToken = async (actualToken, email) => {
    const userCredential = await getUserByEmail(email);
    const refreshToken = userCredential.firebase_refresh;
    const prevToken = userCredential.firebase_idToken;

    // Proceed if actualToken is equal previous valid token and the user have a refresh token
    if (prevToken.length < 50 || prevToken != actualToken || !refreshToken) {
        throw new Error("Token inválido, faça o login novamente");
    };

    try {
        const endpoint = `https://securetoken.googleapis.com/v1/token?key=${api_key}`;
        const response = await axios.post(endpoint, {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        });

        const idToken = response.data.id_token;
        const user = response.data.user_id;

        const saveToken = await updateIdToken(idToken, user);

        return { token: idToken, user: user };

    } catch (error) {
        throw new Error("Token expirado ou inválido, faça o login novamente");
    }
};