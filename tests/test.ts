import request from "supertest";
import app from "../src/app";
import { initDB } from "../src/database";

describe("GET /producers/intervals", () => {
    beforeAll(async () => {
        await initDB();
    });

    it("deve retornar os intervalos corretos para os produtores", async () => {
        const response = await request(app).get("/producers/intervalos");

        expect(response.status).toBe(200);

        const expectedMinStructure = {
            producer: expect.any(String),
            interval: expect.any(Number),
            previousWin: expect.any(Number),
            followingWin: expect.any(Number)
        };

        expect(response.body.min[0]).toMatchObject(expectedMinStructure);
        expect(response.body.max[0]).toMatchObject(expectedMinStructure);

        const minResult = response.body.min.find((i: any) => i.interval === 1);
        expect(minResult).toBeDefined();

        const maxResult = response.body.max.find((i: any) => i.interval > 10);
        expect(maxResult).toBeDefined();
    });
});