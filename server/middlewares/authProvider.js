import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import serviceAccount from "../firebase-credential.json" assert { type: "json" };
import { decode } from "jsonwebtoken";
import dayjs from 'dayjs';
import { updateToken } from "../controllers/authController.js";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const protectedRoute = async (req, res, next) => {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Bearer token was not provided" });
    }
    
    const token = authorization.split("Bearer ")?.[1];
    const decodedToken = decode(token);
    const tokenExpiration = dayjs(decodedToken.exp * 1000).format("YYYY-MM-DD HH:mm:ss");

    if(dayjs(tokenExpiration).isBefore(dayjs())) {
        try {
            const newToken = await updateToken(token, decodedToken.email);
            req.body.user = newToken.user;
            res.locals.newIdToken = newToken.token;
            return next();
        } catch (error) {
            return res.status(403).json({message: "token de acesso inválido, faça o login novamente"});
        }
    } else {
        try {
            const verifiedToken = await getAuth().verifyIdToken(token);
            req.body.user = verifiedToken.uid;
            return next();
        } catch (error) {
            return res.status(403).json({message: "token de acesso inválido, faça o login novamente"});
        }
    }
};