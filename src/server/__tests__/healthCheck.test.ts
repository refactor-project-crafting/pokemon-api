import request from "supertest";
import app from "../app.js";

describe("Given a GET / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code and a '🏓' message", async () => {
      const response = await request(app).get("/");

      const body = response.body as {
        message: string;
      };

      expect(response.status).toBe(200);
      expect(body.message).toBe("🏓");
    });
  });
});
