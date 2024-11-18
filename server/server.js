// import
import express from "express";
import cors from "cors";
import bookingsRoutes from "./routes/bookingsRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv";
import admin from 'firebase-admin';
import * as authController from "./controllers/authController.js";

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

app.post("/auth/refresh-token", authController.refreshToken);
app.post("/auth/login", authController.handleLogin);
app.use("/bookings", bookingsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "server live" });
});

// Capture errors from the server itself
app.on("error", (err) => {
  console.error("Server error:", err);
});

export default app;