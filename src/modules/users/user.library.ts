import UserEntity from "./user.entity";
import { UserError } from "./user.interface";
import Course from "../courses/course.interface";
import * as UserRepository from "./user.repository";
import * as CoursesLibrary from "../courses/course.library";

export const createUser = async (data: any) => {
    const { name, email, uid: googleUid } = userFilter(data);
    const user: UserEntity = await UserRepository.createUser(
        name,
        email,
        googleUid
    );
    return user;
};

export const getUser = async (find: string) => {
    const user: UserEntity = await UserRepository.getUser(find);
    user.courses = await CoursesLibrary.organizeCourses(user.courses);

    return user;
};

export const setUserCourses = async (
    userData: UserEntity | string,
    coursesData: Array<any>
): Promise<UserEntity> => {
    const courses: Array<Course> = await CoursesLibrary.organizeCourses(
        await CoursesLibrary.parseCourses(coursesData)
    );
    return await UserRepository.setCourses(userData, courses);
};

const userFilter = (data: any) => {
    userNameFilter(data);
    userEmailFilter(data);
    userGoogleIdFilter(data);
    return data;
};

const userNameFilter = (data: any) => {
    if (!data.name) {
        throw new UserError(UserError.USER_NAME_EMPTY);
    }
};
const userEmailFilter = (data: any) => {
    if (!data.email) {
        throw new UserError(UserError.USER_EMAIL_EMPTY);
    }
};
const userGoogleIdFilter = (data: any) => {
    if (!data.uid) {
        throw new UserError(UserError.USER_GOOGLEID_EMPTY);
    }
};
