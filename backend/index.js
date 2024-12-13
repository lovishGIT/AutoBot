import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db.connect.js";
import userRouter from './src/routes/user.route.js';
import projectRouter from "./src/routes/project.route.js";
import verifyJWT from "./src/middlewares/auth.middleware.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRouter);
app.use("/api/projects", verifyJWT, projectRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Auto bot API");
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server Listenning on http://localhost:${port}`);
    });
});