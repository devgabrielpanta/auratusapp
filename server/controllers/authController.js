import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export const handleLogin = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    if(!email || !pass) {
        return res.status(400).send("Email/Senhal inválidos");
    }

    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            return res.status(201).send({token: userCredential.user.accessToken});
        })
        .catch((error) => {
            return res.status(400).send("Email/Senhal inválidos");
        });
};