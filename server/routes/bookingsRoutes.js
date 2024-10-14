// imports
import express from "express";
import * as bookingsController from "../controllers/bookingsController.js";
const router = express.Router();

// CRUD Routes
router.get("/", bookingsController.getAllBookings);
router.post("/", bookingsController.createBooking);
router.put("/:id", bookingsController.updateBooking);

// export
export default router;
