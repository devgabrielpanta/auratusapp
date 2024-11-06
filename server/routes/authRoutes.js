// imports
import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/", authController.authValidation);
router.post("/login", authController.handleLogin);

export default router;