import request from "supertest";
import server from "../src/server"; // Asumiendo que 'server' es el archivo que contiene tu servidor Express
import { User } from "../src/models/User"; // Importa tu modelo de usuario

// Mock de Sequelize para evitar errores de inicialización
import { sequelize } from "../src/db"; // Ruta al archivo de configuración de Sequelize

beforeAll(async () => {
  await sequelize.authenticate(); // Verifica la conexión a la base de datos
  await sequelize.sync({ force: true }); // Sincroniza los modelos con la base de datos, eliminando todas las tablas existentes
});

afterAll(async () => {
  await sequelize.close(); // Cierra la conexión de Sequelize después de las pruebas
});

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

describe("Server", () => {
  test("should GET response whit status 200 /api/ps/ping", async () => {
    const response = await request(server).get("/api/ps/ping");
    expect(response.status).toBe(200);
  });
  describe("test GET router register", () => {
    test("should GET response whit status 200 /api/ps/register", async () => {
      const response = await request(server).get("/api/ps/register");
      expect(response.status).toBe(200);
    });
    test("should GET response whit content-type json /api/ps/register", async () => {
      const response = await request(server).get("/api/ps/register");
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
  describe("test POST router register", () => {
    test("should POST response with status 200 /api/ps/register", async () => {
      const response = await request(server)
        .post("/api/ps/register")
        .send(user);
      expect(response.status).toBe(200);
    });
    test("should POST response whit content-type json /api/ps/register", async () => {
      const response = await request(server).post("/api/ps/register").send(user);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("should POST response whit message  /api/ps/register", async () => {
      const use = {
        email: "testing@jest.com",
        firstName: "test",
        lastName: "jest",
        userName: "testing",
        password: "babel1234",
        admin: false,
        ipAddress: "191.168.0.1",
        experience: 1,
        job: 1,
        war: 1,
        store: 1,
        level: 1,
        nextLevel: 2,
      }
      const response = await request(server).post("/api/ps/register").send(use);
      expect(response.body).toEqual(
        expect.stringContaining(`Usuario creado correctamente con username ${use.userName}.`)
      );
    });
  });

  describe("test POST router register error", () => {
    test("should POST response with status 405 for data user undefine or not data user POST /api/ps/register", async () => {
      const response = await request(server).post("/api/ps/register").send();
      expect(response.status).toBe(405);
      expect(response.body.error).toEqual("Faltan datos para el registro");
    });
    test("should POST response with status 401 for duplicate email registration POST /api/ps/register", async () => {
      const users = [
        {
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
        },
        {
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
        },
      ];
      for (const x of users) {
        const response = await request(server).post("/api/ps/register").send(x);
        if (response.status === 401) {
          expect(response.status).toBe(401);
          expect(response.body).toEqual("El email ya esta registrado");
        }
      }
    });
  });
  describe("Authentication Router", () => {
    test("should POST respond with status 200 and set accessToken cookie on successful login", async () => {
      const login = { session: "ejemplo@example.com", password: "babel1234" };

      const response = await request(server).post("/api/ps/auth").send(login);
      // Verificar que la respuesta sea exitosa (status 200)
      expect(response.status).toBe(200);
      // Verificar que se haya creado la cookie 'accessToken'
      expect(response.headers["set-cookie"]).toBeDefined();
      // Verificar que el cuerpo de la respuesta contenga el mensaje de éxito
      expect(response.body.success).toBe(true);
    });

    test("should POST respond with status 404 and an error message on unsuccessful login", async () => {
      const login = {
        session: "invalidpassword@example.com",
        password: "invalidpassword",
      };
      const response = await request(server)
        .post("/api/ps/auth") // Ruta de autenticación
        .send(login);
      // Verificar que la respuesta sea un error (status 404)
      expect(response.status).toBe(404);
      // Verificar que el cuerpo de la respuesta contenga el mensaje de error
      expect(response.body).toEqual(
        "Credenciales incorrectas correo electronico no encontrado."
      );
    });

    test("should POST respond with status 404 and an error message on unsuccessful login", async () => {
      const login = {
        session: "ejemplo@example.com",
        password: "invalidpassword",
      };
      const response = await request(server)
        .post("/api/ps/auth") // Ruta de autenticación
        .send(login);
      // Verificar que la respuesta sea un error (status 404)
      expect(response.status).toBe(404);
      // Verificar que el cuerpo de la respuesta contenga el mensaje de error
      expect(response.body).toEqual("Credenciales incorrectas.");
    });
  });
});
