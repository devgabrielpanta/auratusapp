//ambiente
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import admin from 'firebase-admin';
import "../firebase.js";
//import "../db.js";
import * as db from "../db.js";


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

//testando o banco de dados no index.js
const dbName = process.env.DB_USERS;

app.post("/teste", async (req, res) => {
  /**
  try {
    const email = req.body.email;
    const query = `SELECT * FROM ${dbName} WHERE email = "${email}"`;
    const [result] = await db.promise().query(query);
    return res.status(200).send(result[0]);
  } catch (error) {
    return res.status(500).send("Falha na comunicação com o banco de dados");
  }
  */
  try {
    /**
    const email = req.body.email;
    const query = `SELECT * FROM ${dbName} WHERE email = "${email}"`;
    const [result] = await db.promise().query(query);
     */
    return res.status(200).send(`Testando o seguinte banco de dados: ${dbName}`);
    // return res.status(200).send(`buscando o seguinte email no db: ${email}`);
  } catch (error) {
    return res.status(500).send("falha no teste");
  }
});

app.use("/auth", authRoutes);


app.listen(3000, () => console.log('Server ready on: http://localhost:3000'));

export default app;