import { sequelize } from "../src/db";

describe('Database connection', () => {
  it('should connect to the database successfully', async () => {
    try {
      await sequelize.authenticate();
      expect(true).toBe(true); // Si la conexión tiene éxito, la prueba pasa
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      expect(true).toBe(false); // Si hay un error de conexión, la prueba falla
    }
  });
});
