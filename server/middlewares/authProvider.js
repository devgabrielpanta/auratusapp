import { verifyToken } from "../controllers/authController.js";


export const protectedRoute = async (req, res, next) => {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Bearer token was not provided" });
    }
    const token = authorization.split("Bearer ")?.[1];
    try {
        const userMail = await verifyToken(token);
        req.body.user = userMail;
        return next();
    } catch (error) {
        return res.status(403).json({message: "token de acesso inválido, faça o login novamente"});
    }
};