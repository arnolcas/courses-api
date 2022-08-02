import * as uuid from "uuid";
import Course from "../courses/course.interface";
import User, { UserError } from "./user.interface";
import UserEntity from "./user.entity";

export const createUser = async (
    name: string,
    googleUid: string,
    email: string
): Promise<UserEntity> => {
    const user: UserEntity = new UserEntity();
    user.name = name;
    user.googleUid = googleUid;
    user.email = email;

    await user.save();

    return user;
};

export const getUser = async (find: string): Promise<UserEntity> => {
    const where: Array<any> = [{ googleUid: find }, { email: find }];
    if (uuid.validate(find)) {
        where.push({ id: find });
    }
    const user: UserEntity | null = await UserEntity.findOne({
        where,
        relations: ["courses", "courses.requiredBefore"],
    });

    if (!user) {
        throw new UserError(UserError.USER_NOT_FOUND);
    }

    return user;
};

export const setCourses = async (
    find: string | UserEntity,
    courses: Array<Course>
): Promise<UserEntity> => {
    const user: UserEntity =
        typeof find === "string" ? await getUser(<string>find) : find;

    user.courses = courses;
    await user.save();

    return user;
};
