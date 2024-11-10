import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import serviceAccount from "../firebase-credential.json" assert { type: "json" };
import { decode } from "jsonwebtoken";
import dayjs from 'dayjs';
import { getUserByEmail } from "../models/authModel.js";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const api_key = process.env.FIREBASE_APIKEY;

// Exchange a refresh token for an ID token:
const updateToken = async (email) => {
    const endpoint = `https://securetoken.googleapis.com/v1/token?key=${api_key}`;

    const refreshToken = await getUserByEmail(email);
    if (!refreshToken) {
        throw new Error("Token inválido, faça o login novamente");
    }
    axios.post(endpoint, {
        grant_type: "refresh_token",
        refresh_token: refreshToken
    })
    .then((response) => {
        const idToken = response.data.id_token;
        const user_id = response.data.user_id;
        return {
            token: idToken,
            user: user_id
        };
    })
    .catch((error) => {
        throw new Error("Token expirado ou inválido, faça o login novamente");
    })
};

export const protectedRoute = async (req, res, next) => {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Bearer token was not provided" });
    }
    
    const token = authorization.split("Bearer ")?.[1];
    const decodedToken = decode(token);
    const tokenExpiration = dayjs(decodedToken.exp * 1000).format("YYYY-MM-DD HH:mm:ss");
    
    try {

        if(dayjs(tokenExpiration).isBefore(dayjs())) {
            const newToken = await updateToken(decodedToken.email);
            req.body.user = newToken.user;
            res.locals.newIdToken = newToken.token;
            return next();
        }

        const verifiedToken = await getAuth().verifyIdToken(token);
        req.body.user = verifiedToken.uid;
        return next();

    } catch (error) {
        return res.status(403).json({message: "token de acesso inválido, faça o login novamente"});
    }
};