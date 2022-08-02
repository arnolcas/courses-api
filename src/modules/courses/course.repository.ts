import CourseEntity from "./course.entity";
import Course, { CourseError } from "./course.interface";

/**
 *
 * @param name
 * @param requiredBefore
 * @returns
 */
const createCourse = async (
    name: string,
    requiredBefore?: Course
): Promise<Course> => {
    const course: Course = new CourseEntity();
    course.name = name;
    course.requiredBefore = requiredBefore;

    await course.save();

    return course;
};

/**
 *
 * @param find
 * @returns
 */
export const getCourse = async (find: number | string): Promise<Course | null> => {
    const where: any = {};

    if (typeof find === "number") {
        where.id = find;
    }

    if (typeof find === "string") {
        where.name = find;
    }

    const course: Course | null = await CourseEntity.findOneBy(where);

    return course;
};

/**
 *
 * @param name
 * @param requiredBefore
 * @returns
 */
export const readCrateOrCourse = async (
    name: string,
    requiredBefore?: Course
): Promise<Course> => {
    const course =
        (await getCourse(name)) || (await createCourse(name, requiredBefore));

    if (requiredBefore) {
        if (!course.requiredBefore) {
            course.requiredBefore = requiredBefore;
            await course.save();
        } else if (course.requiredBefore.name !== requiredBefore.name) {
            throw new CourseError(CourseError.REQUIRED_COURSE_IS_WROG);
        }
    }

    return course;
};
