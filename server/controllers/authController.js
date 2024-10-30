import { auth } from "../firebase.js"
import { signInWithEmailAndPassword } from "firebase/auth";

export const handleLogin = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            console.log(userCredential);
            res.status(202).send(userCredential); // expondo os dados apenas para testes, depois não serão enviados para o client.
        })
        .catch((error) => {
            console.error(error);
            res.status(400);
        })
};