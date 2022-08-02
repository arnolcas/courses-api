import course from "./course.entity";

export default interface Course extends course {}

export class CourseError extends Error {
    static COURSE_NOT_FOUND = "Course not found";
    static COURSE_NAME_EMPTY = "Course can not be empty or null";
    static COURSE_CANT_REQUIRED_HIMSELF = "Course can not required himself";
    static REQUIRED_COURSE_IS_WROG = "Required course was set before";

    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, CourseError.prototype);
    }
}
