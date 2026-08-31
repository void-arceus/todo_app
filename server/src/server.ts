import "dotenv/config";
import { Request, Application } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import authRouter from "./routes/auth.route";
import taskRouter from "./routes/task.route";
import cors, { CorsOptions } from "cors";

const PORT = process.env.PORT;
const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// cors setup
const allowedOrigins = ["http://localhost:5173"];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
        else {
            callback(new Error("Not allowed by CORS!"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors<Request>(corsOptions));

// connecting to databseconnectDB();
connectDB();

// routes
app.use("/v1/auth", authRouter);
app.use("/v1/task", taskRouter);

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});
