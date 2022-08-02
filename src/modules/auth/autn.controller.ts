import { Request, Response } from "express";
import User from "../users/user.interface";
import * as AuthLibrary from "./auth.library";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user: User = await AuthLibrary.login(email, password);
        res.json(user);
    } catch (error) {
        if (error instanceof Error)
            return res.status(401).json({ errors: [{ msg: error.message }] });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user: User = await AuthLibrary.registerUser(
            name,
            email,
            password
        );
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(401).json({ errors: [{ msg: error.message }] });
    }
};
