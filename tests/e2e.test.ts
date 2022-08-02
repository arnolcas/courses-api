require("dotenv").config();
import { expect } from "chai";
import request from "supertest";

import postgres from "../src/services/postgres/data-source";
import server from "../src/services/express/server";
import { CannotConnectAlreadyConnectedError } from "typeorm";

const userName = `User ${Date.now()}`;
const userEmail = `user_${Date.now()}@test.com`;
const userPass = `user_${Date.now()}`;
var userId = "";
var userToken = "";

before("Start db", async () => {
    await postgres.initialize().catch((err) => {
        if (!(err instanceof CannotConnectAlreadyConnectedError)) {
            throw err;
        }
    });
});
describe("Register an user and set Courses", () => {
    before("Create a customer", async () => {
        const response = await request(server)
            .post("/api/v1/auth/register")
            .send({
                name: userName,
                email: userEmail,
                password: userPass,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201);

        userId = response.body.id;
        userToken = response.body.stsTokenManager.accessToken;
    });

    it("Set courses to user", async () => {
        const response = await request(server)
            .post("/api/v1/users")
            .set("x-token", userToken)
            .set("Accept", "application/json")
            .send(dataToTest())
            .expect("Content-Type", /json/)
            .expect(201);
        const courses = response.body.user.courses;
        expect(dataExpected[0].name).equal(courses.at(0).name);
        expect(dataExpected[dataExpected.length - 1].name).equal(
            courses.at(-1).name
        );
    });
});

const dataToTest = () => ({
    userId: userId,
    courses: [
        {
            desiredCourse: "PortfolioConstruction",
            requiredCourse: "PortfolioTheories",
        },
        {
            desiredCourse: "InvestmentManagement",
            requiredCourse: "Investment",
        },
        {
            desiredCourse: "Investment",
            requiredCourse: "Finance",
        },
        {
            desiredCourse: "PortfolioTheories",
            requiredCourse: "Investment",
        },
        {
            desiredCourse: "InvestmentStyle",
            requiredCourse: "InvestmentManagement",
        },
    ],
});

const dataExpected = [
    {
        name: "Finance",
    },
    {
        name: "Investment",
        requiredBefore: {
            name: "Finance",
        },
    },
    {
        name: "InvestmentManagement",
        requiredBefore: {
            name: "Investment",
        },
    },
    {
        name: "InvestmentStyle",
        requiredBefore: {
            name: "InvestmentManagement",
        },
    },
    {
        name: "PortfolioTheories",
        requiredBefore: {
            name: "Investment",
        },
    },
    {
        name: "PortfolioConstruction",
        requiredBefore: {
            name: "PortfolioTheories",
        },
    },
];
