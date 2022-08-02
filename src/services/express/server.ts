import express from "express";
import morgan from "morgan";
import cors from "cors";
// import path from "path";

// Load Modules
import auth from "../../modules/auth/auth.routes";
import users from "../../modules/users/user.routes";

const server = express();

// Http request logger
server.use(morgan("dev"));

// Enable Cors
server.use(cors());

// Middleware
server.use(express.json());

// Routes
const rootPath = "/api/v1";

server.use(`${rootPath}/auth`, auth);
server.use(`${rootPath}/users`, users);

server.use(express.static("public"));

export default server;
