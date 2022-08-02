import { readCrateOrCourse } from "./course.repository";
import Course, { CourseError } from "./course.interface";

/**
 *
 * @param data
 * @returns
 */
const createCourse = async (data: any): Promise<Course> => {
    const { desiredCourse, requiredCourse: required } = courseFilter(data);
    const requiredCourse: Course = await readCrateOrCourse(required);
    const course: Course = await readCrateOrCourse(
        desiredCourse,
        requiredCourse
    );

    return course;
};

/**
 *
 * @param data
 * @returns
 */
const courseFilter = (data: any) => {
    courseNameFilter(data);
    courseRequiredHimselfFilter(data);
    return data;
};

/**
 *
 * @param data
 * @returns
 */
const courseNameFilter = (data: any) => {
    if (!data.desiredCourse) {
        throw new CourseError(CourseError.COURSE_NAME_EMPTY);
    }
};

/**
 *
 * @param data
 * @returns
 */
const courseRequiredHimselfFilter = (data: any) => {
    if (data.desiredCourse === data.requiredCourse) {
        throw new CourseError(CourseError.COURSE_CANT_REQUIRED_HIMSELF);
    }
};

export const parseCourses = async (
    data: Array<any>
): Promise<Array<Course>> => {
    const courses: Array<Course> = [];
    for (const d of data) {
        const couse: Course = await createCourse(d);
        courses.unshift(couse);
    }
    return courses;
};

export const organizeCourses = async (
    courses: Array<Course>
): Promise<Array<Course>> => {
    let sortedCursos: Array<Course> = [];

    exploreChildCourses(courses).forEach((current) => {
        const required = sortedCursos.findIndex(
            (d) => current.requiredBefore?.name === d.name
        );
        if (required > -1) {
            sortedCursos.splice(required + 1, 0, current);
        } else {
            sortedCursos.push(current);
        }

        reorderList(current, sortedCursos);
    });

    return sortedCursos;
};

const exploreChildCourses = (courses: Array<Course>): Array<Course> => {
    courses.forEach((c) => {
        if (c.requiredBefore) {
            if (
                !courses.find((f: Course) => c.requiredBefore?.name === f.name)
            ) {
                courses.unshift(c.requiredBefore);
            }
        }
    });

    return courses;
};

const reorderList = (course: Course, courses: Array<Course>) => {
    const eIdx = courses.findIndex((a) => a.name === course.name);
    const coursesToMove = courses.filter(
        (a) => a.requiredBefore?.name == course.name
    );
    coursesToMove.forEach((m) => {
        const idx = courses.findIndex((a) => a.name === m.name);
        courses.splice(idx, 1);
        courses.splice(eIdx + 1, 0, m);
        reorderList(m, courses);
    });
};
