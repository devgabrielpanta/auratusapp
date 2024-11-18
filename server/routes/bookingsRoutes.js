import express from "express";
import * as bookingsController from "../controllers/bookingsController.js";
import { getAuth } from 'firebase-admin/auth';

const router = express.Router();

router.use(async (req, res, next) => {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Bearer token was not provided" });
    }
    const token = authorization.split("Bearer ")?.[1];
    try {
        const userCredentials = await getAuth().verifyIdToken(token);
        req.body.user = userCredentials.email;
        return next();
    } catch (error) {
        return res.status(403).json({message: "token de acesso inválido, faça o login novamente"});
    }
});

// CRUD Routes
router.get("/", bookingsController.getAllBookings);
router.post("/", bookingsController.createBooking);
router.put("/:id", bookingsController.updateBooking);

// export
export default router;