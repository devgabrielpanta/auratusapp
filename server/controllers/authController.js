//firebase web
import { webAuth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setFirebaseToken } from "../models/authModel.js";

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
            setFirebaseToken(refresh_token, id_token, uid)
            return res.status(201).send({token: id_token});
        })
        .catch((error) => {
            return res.status(400).send("Email/Senha inválidos");
        });
};