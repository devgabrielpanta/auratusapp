//ambiente
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import admin from 'firebase-admin';
import "../firebase.js";
import "../db.js";


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

app.get("/", async (req, res) => {
    res.status(200).send("server live on vercel");
});
app.use("/auth", authRoutes);


app.listen(3000, () => console.log('Server ready on: http://localhost:3000'));

export default app;