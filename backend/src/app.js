import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import consultationRoutes from "./routes/consultationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/consultation", consultationRoutes);
app.get("/test", (req, res) => {
    res.json({ success: true });
});

export default app;