//ambiente
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import bookingsRoutes from "../routes/bookingsRoutes.js";
import admin from 'firebase-admin';
import "../firebase.js";
import "../db.js";


// app settings
const app = express();
const originDomain = process.env.CLIENT_DOMAIN;
const slashedDomain = originDomain + "/";
app.use(cors(
  {
  credentials: true,
  origin: [
    originDomain,
    slashedDomain
  ],
  methods: "GET,PUT,POST"
  })
);
app.options('*', cors(
  {
    credentials: true,
    origin: [
      originDomain,
      slashedDomain
    ],
    methods: "GET,PUT,POST"
  })
);

app.use(express.json());

// initialize firebase
admin.initializeApp({
  credential: admin.credential.cert({
      projectId: process.env.FIREBASE_SERVICE_PROJECTID,
      clientEmail: process.env.FIREBASE_SERVICE_CLIENTEMAIL,
      privateKey: process.env.FIREBASE_SERVICE_PRIVATEKEY,
  }),
});

// routes
app.get("/", async (req, res) => {
    res.status(200).send("server live on vercel");
});
/**
app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  res.header(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
 */
app.use("/auth", authRoutes);
app.use("/bookings", bookingsRoutes);

app.listen(3000, () => console.log('Server ready on: http://localhost:3000'));

export default app;