import { expect } from "chai";
import Course from "../src/modules/courses/course.interface";
import { organizeCourses } from "../src/modules/courses/course.library";

describe("Ordering test", () => {
    /**
     *  Test a right order from a list of courses filtered previouslyTest a correct ordering of a list of prefiltered courses
     */
    it("Test a right order", async () => {
        const result = await organizeCourses(rightOrderData);
        result.forEach((e: Course, i: number) => {
            expect(testRightOrderDataExpected[i].name).equal(e.name);
        });
    });
});

const rightOrderData = [
    <Course>{
        name: "PortfolioConstruction",

        requiredBefore: {
            name: "PortfolioTheories",
        },
    },
    <Course>{
        name: "InvestmentManagement",

        requiredBefore: {
            name: "Investment",
        },
    },
    <Course>{
        id: 3,
        name: "Investment",
        requiredBefore: {
            id: 5,
            name: "Finance",
        },
    },
    <Course>{
        name: "PortfolioTheories",

        requiredBefore: {
            name: "Investment",
        },
    },
    <Course>{
        name: "InvestmentStyle",

        requiredBefore: {
            name: "InvestmentManagement",
        },
    },
];

const testRightOrderDataExpected = [
    {
        name: "Finance",
    },
    {
        id: 3,
        name: "Investment",
        requiredBefore: {
            id: 5,
            name: "Finance",
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
];
