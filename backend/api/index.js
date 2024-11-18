import express from "express";

const app = express();

app.use(express.json());


app.get("/", async (req, res) => {
    res.status(200).send("server live on vercel");
});

app.get("/auth", async (req, res) => {
    res.status(200).send("rota get auth ok");
});

app.post("/auth", async (req, res) => {
    res.status(200).send("rota post auth ok");
});

app.listen(3000, () => console.log('Server ready on: http://localhost:3000'));

export default app;