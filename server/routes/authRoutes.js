// imports
import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/refresh-token", authController.refreshToken); //falta implementar no front e testar
router.post("/login", authController.handleLogin);

export default router;