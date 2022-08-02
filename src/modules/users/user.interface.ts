import user from "./user.entity";

export default interface User extends user {
    stsTokenManager: {
        refreshToken: string;
        accessToken: string;
    };
}

export class UserError extends Error {
    static USER_NOT_FOUND = "User not found";
    static USER_NAME_EMPTY = "Course can not be empty or null";
    static USER_GOOGLEID_EMPTY = "Course can not be empty or null";
    static USER_EMAIL_EMPTY = "Course can not be empty or null";

    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, UserError.prototype);
    }
}
