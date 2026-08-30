import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";
import authRouter from "./routes/auth.route";
import taskRouter from "./routes/task.route";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

// connecting to databse
connectDB();

// routes
app.use("/v1/auth", authRouter);
app.use("/v1/task", taskRouter);

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});
