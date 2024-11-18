import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "server live on vercel"})});

app.listen(3000, () => console.log("Server running on: http://localhost.com:3000"));

export default app;