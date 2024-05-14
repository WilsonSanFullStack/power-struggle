import request from "supertest";
import server from "../src/server"; // Asumiendo que 'server' es el archivo que contiene tu servidor Express

const user = {
  email: "ejemplo@example.com",
  firstName: "test",
  lastName: "jest",
  userName: "testts",
  password: "babel1234",
  admin: false,
  ipAddress: "191.168.0.1",
  experience: 1,
  job: 1,
  war: 1,
  store: 1,
  level: 1,
  nextLevel: 2,
};

const login = { session: user.email, password: user.password };
describe("Server", () => {
  it("should respond with status 200 for GET requests to /", async () => {
    const response = await request(server).get("/api/ps/ping");
    expect(response.status).toBe(200);
  });
  it("should respond with status 200 for GET requests to /", async () => {
    const response = await request(server).get("/api/ps/register");
    expect(response.status).toBe(200);
  });
  it("should create a new user", async () => {
    const response = await request(server).post("/api/ps/register").send(user);
    expect(response.status).toBe(200);
  });
  it("should login correcto", async () => {
    const data = await request(server).post("/api/ps/register").send(user);
    expect(data.status).toBe(200);
    const response = await request(server).post("/api/ps/auth").send(login);
    expect(response.body).toBe("Credenciales incorrectas.");
    expect(response.status).toBe(404);
    expect(response.status).toBe(200);
  });
});
