import {Request, Response, NextFunction} from "express";
import jwt, {VerifyErrors} from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401).json({error: "Authorization token not present in the request header!"});
        return;
    }

    jwt.verify(token, JWT_SECRET, (error: VerifyErrors | null, user: any) => {
        if (error) {
            res.sendStatus(401).json({error: "Invalid or expired auth token provided!"});
            return;
        }

        (req as Request & {user?: any}).user = user;
        next();
    });
}

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as Request & {user?: any}).user;
        if (!user || !roles.includes(user.role)) {
            res.sendStatus(403).json({error: "Access denied! You don't have permission to access this resource!"});
            return;
        }
        next();
    }
}