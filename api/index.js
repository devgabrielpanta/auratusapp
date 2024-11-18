import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "server live on vercel"})});

app.get("/auth", (req, res) => {
    res.status(200).json({message: "rota get auth ok"})});

app.post("/auth", (req, res) => {
    res.status(200).json({message: "rota post auth ok"})});

app.listen(3000, () => console.log("Server running on: http://localhost.com:3000"));

export default app;