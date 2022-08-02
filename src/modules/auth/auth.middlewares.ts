import { NextFunction, Request, Response } from "express";
import { validateToken } from "./auth.library";
import User from "../users/user.interface";

export const validateAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = req.header("x-token");
        if (!accessToken) {
            throw new Error("Is No Auth");
        }
        const user: User = await validateToken(accessToken);
        req.body.currentUser = user;
        next();
    } catch (error) {
        if (error instanceof Error)
            res.status(401).json({ errors: [{ msg: error.message }] });
    }
};
