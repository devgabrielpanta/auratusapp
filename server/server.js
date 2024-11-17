// import
import express from "express";
import cors from "cors";
import bookingsRoutes from "./routes/bookingsRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv";
import { protectedRoute } from "./middlewares/authProvider.js";
import admin from 'firebase-admin';

const port = 3001;

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

app.use("/auth", authRoutes);
app.use(protectedRoute);
app.use("/bookings", bookingsRoutes);


// Error handler for uncaught exceptions
// app.use((err, req, res, next) => {
//     if (err.code === 'ECONNRESET') {
//       console.log('Connection was reset by the client');
//     } else {
//       console.error('Server error:', err);
//     }
//     res.status(500).send('Something went wrong!');
//   });

// start app
app.listen(port, (err) => {
  if (err) {
    console.error("Server error:", err);
  } else {
    console.log(`server running on: http://localhost:${port}/`);
  }
});

// Capture errors from the server itself
app.on("error", (err) => {
  console.error("Server error:", err);
});

export default app;