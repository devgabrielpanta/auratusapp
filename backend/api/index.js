import express from "express";
import authRoutes from "../routes/authRoutes.js";

const app = express();

app.use(express.json());


app.get("/", async (req, res) => {
    res.status(200).send("server live on vercel");
});
app.use("/auth", authRoutes);


app.listen(3000, () => console.log('Server ready on: http://localhost:3000'));

export default app;