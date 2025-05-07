import request from "supertest";
import app from "../app.js";

describe("Given a GET /doraemon non existent endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 404 status code and an 'Endpoint not found' error", async () => {
      const response = await request(app).get("/doraemon");

      const body = response.body as {
        error: string;
      };

      expect(response.status).toBe(404);
      expect(body.error).toBe("Endpoint not found");
    });
  });
});
