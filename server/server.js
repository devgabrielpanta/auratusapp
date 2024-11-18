// import
import express from "express";
import cors from "cors";
import bookingsRoutes from "./routes/bookingsRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv";
import admin from 'firebase-admin';
//authController
import axios from 'axios';
import { setLoginTokens, getUserByEmail } from "./models/authModel.js";
//firebase web
import { webAuth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
//firebase admin
import { getAuth } from 'firebase-admin/auth';

// eslint-disable-next-line no-undef
dotenv.config();

// app settings
const app = express();
app.use(cors({ credentials: true, origin: process.env.CLIENT_DOMAIN }));
app.use(express.json());

// initialize firebase
admin.initializeApp({
  credential: admin.credential.cert({
      projectId: process.env.FIREBASE_SERVICE_PROJECTID,
      clientEmail: process.env.FIREBASE_SERVICE_CLIENTEMAIL,
      privateKey: process.env.FIREBASE_SERVICE_PRIVATEKEY,
  }),
});

app.post("/auth/login", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  if(!email || !pass) {
      return res.status(400).send("Email/Senha inválidos");
  }
  try {
      const userCredential = await signInWithEmailAndPassword(webAuth, email, pass);
      const refresh_token = userCredential._tokenResponse.refreshToken;
      const uid = userCredential._tokenResponse.localId;
      const id_token = userCredential._tokenResponse.idToken;
      const affectedUser = await setLoginTokens(refresh_token, uid);
      if (affectedUser < 1) {
          return res.status(502).json({ message: "Usuário não localizado" });
      } else {
          return res.status(201).send({token: id_token});
      }
  } catch (error) {
      return res.status(400).json({ message: "Email/Senha inválidos" });
  }
});
app.use("/auth", authRoutes);
app.use("/bookings", bookingsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "server live" });
});

// Capture errors from the server itself
app.on("error", (err) => {
  console.error("Server error:", err);
});

export default app;