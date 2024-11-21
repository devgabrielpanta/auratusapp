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
app.use(express.json());

// cors
const allowedOrigins = [
  process.env.CLIENT_DOMAIN,
  `${process.env.CLIENT_DOMAIN}/`
];
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: ["GET", "POST", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// cors preflight
app.options("*", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": process.env.CLIENT_DOMAIN,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  });
  res.sendStatus(200);
});

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