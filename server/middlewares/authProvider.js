export const protectedRoute = (req, res, next) => {
    const email = req.cookies.user;
    const idToken = req.cookies.id_token;
  
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return res
        .status(403)
        .json({ message: "Bearer token was not provided" });
    }
  
    authorization.split("Bearer ")?.[1];
  
    // firebase verify token
    // se tiken valido chama o next()
    // se token invalido reponse com error de não autorizado
  
    if (!email || !idToken) {
      return res.status(401).send("Autentique a sessão antes de prosseguir");
    } else {
      return next();
    }
};