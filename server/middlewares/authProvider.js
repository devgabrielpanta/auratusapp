import { getAuth } from 'firebase-admin/auth';


export const protectedRoute = async (req, res, next) => {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Bearer token was not provided" });
    }
    const token = authorization.split("Bearer ")?.[1];
    try {
        const userCredentials = await getAuth().verifyIdToken(token);
        req.body.user = userCredentials.email;
        return next();
    } catch (error) {
        return res.status(403).json({message: "token de acesso inválido, faça o login novamente"});
    }
};