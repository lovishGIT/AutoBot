import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from './src/routes/user.route.js';
import { connectDB } from "./src/db/db.connect.js";
import ticketRouter from "./src/routes/ticket.route.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // cross-origin-resource-storing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/ticket", ticketRouter);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server Listenning on http://localhost:${port}`);
    })
});