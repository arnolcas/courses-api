require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";

import auth from "../../modules/courses/course.entity";
import users from "../../modules/users/user.entity";

export default new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_NAME,
    synchronize: true,
    logging: false,
    entities: [auth, users],
    subscribers: [],
    migrations: [],
});
