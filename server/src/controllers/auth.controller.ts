import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

interface ITokenPayload {
    id: String;
}

export async function handleRegister(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body;

        // hashing password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating user
        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            status: true,
            message: "Registered Successfully",
            data: {
                hashedPassword: hashedPassword,
            },
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}

export async function handleLogin(req: Request, res: Response) {
    try {
        const data = req.body;
        const { email, password, rememberme } = data;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            });
        }

        let compare = await bcrypt.compare(password, user.password as string);
        if (!compare) {
            return res.status(400).json({
                status: false,
                message: "Invalid Email or Password",
            });
        }

        const payload: ITokenPayload = {
            id: user._id.toString(),
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
            expiresIn: rememberme ? "7d" : "1d",
        });

        res.cookie("Token", token, { maxAge: 24 * 60 * 60 * 1000 });

        return res.status(200).json({
            status: true,
            message: "Logged In Successfully",
            data: {
                username: user.username,
                email: email,
            },
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}

export async function handleLogOut(req: Request, res: Response) {
    try {
        res.clearCookie("Token");
        return res.status(200).json({
            status: true,
            message: "Logged out successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}

export async function handleMe(req: Request, res: Response) {
    try {
        const userData = await User.findOne({ _id: req.user?.id });
        if (!userData) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: true,
            message: "User is logged in",
            data: {
                username: userData.username,
                email: userData.email,
            },
        });
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}
