import express, { type Router } from "express";
import {
    handleRegister,
    handleLogin,
    handleLogOut,
} from "../controllers/auth.controller";

const authRouter: Router = express.Router();

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogOut);

export default authRouter;
