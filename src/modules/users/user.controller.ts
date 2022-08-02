import { Request, Response } from "express";
import UserEntity from "./user.entity";
import * as UserLibrary from "./user.library";

export const setCourses = async (req: Request, res: Response) => {
    try {
        const { userId, courses } = req.body;
        const user: UserEntity = await UserLibrary.setUserCourses(
            userId,
            courses
        );
        res.status(201).json({ user });
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ errors: [{ msg: error.message }] });
    }
};

export const getCourses = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user: UserEntity = await UserLibrary.getUser(userId);
        res.json({ user });
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ errors: [{ msg: error.message }] });
    }
};
