import express, { type Router } from "express";
import {
    handleRegister,
    handleLogin,
    handleLogOut,
    handleMe,
} from "../controllers/auth.controller";
import { authUser } from "../middleware/auth.middleware";

const authRouter: Router = express.Router();

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogOut);
authRouter.get("/me", authUser, handleMe);

export default authRouter;
