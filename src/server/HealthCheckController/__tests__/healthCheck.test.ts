import request from "supertest";
import app from "../../app";

describe("Given a GET / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 200 status code", async () => {
      await request(app).get("/").expect(200);
    });
  });
});
