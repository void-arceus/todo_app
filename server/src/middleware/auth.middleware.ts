import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: { id: string };
        }
    }
}

export async function authUser(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const token = req.cookies.Token || null;
        if (!token) {
            return res.status(403).json({
                status: false,
                message: "Token not provided",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY as string,
        ) as { id: string };

        if (!decoded) {
            return res.status(401).json({
                status: false,
                message: "Access denied, Unauthorized",
            });
        }
        req.user = decoded;
        next();
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}
