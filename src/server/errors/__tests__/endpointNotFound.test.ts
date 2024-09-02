import request from "supertest";
import app from "../../app";

describe("Given the non-existent endpoint GET /tomato", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with an 'Endpoint not found' message and status code 404", async () => {
      const expectedStatusCode = 404;
      const path = "/tomato";

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as {
        error: string;
      };

      expect(responseBody).toHaveProperty("error", "Endpoint not found");
    });
  });
});
