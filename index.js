import express from "express";
import "./database/config.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("http://localhost:" + PORT));
