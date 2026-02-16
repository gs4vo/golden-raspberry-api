import request from "supertest";
import app from "../src/app";
import { initDB } from "../src/database";

describe("GET /producers/intervals", () => {
    beforeAll(async () => {
        await initDB();
    });

    it("should return the correct intervals for producers", async () => {
        const response = await request(app).get("/producers/intervalos")
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("min");
        expect(response.body).toHaveProperty("max");
        expect(Array.isArray(response.body.min)).toBe(true);
        expect(Array.isArray(response.body.max)).toBe(true);
    })
})