import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "server live on vercel"})});

app.get("/auth", (req, res) => {
    res.status(200).send({message: "rota get auth ok"})});

app.post("/auth", (req, res) => {
    res.status(200).send({message: "rota post auth ok"})});

export default app;