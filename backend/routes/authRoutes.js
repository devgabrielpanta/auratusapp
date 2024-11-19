import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
    res.status(200).send("rota post /auth/login ok");
});

router.post("/refresh-token", async (req, res) => {
    res.status(200).send("rota post /auth/refresh-token ok");
});

export default router;