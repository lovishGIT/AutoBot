import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.connect.js";
import userRouter from './src/routes/user.route.js';
import ticketRouter from "./src/routes/ticket.route.js";
import projectRouter from "./src/routes/project.route.js";
import verifyJWT from "./src/middlewares/auth.middleware.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/projects", verifyJWT, projectRouter);
app.use("/api/projects/:projId/tickets", verifyJWT, ticketRouter);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server Listenning on http://localhost:${port}`);
    });
});