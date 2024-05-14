import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateToken } from "../jwt/jwt";

export const logging = async (login: { session: string; password: string }) => {
  try {
    const {session, password } = login
    const user = await User.findOne({
      where: { email: login.session },
      attributes: ["id", "firstName", "lastName", "email", "password", "admin"],
    });
    if (!user) {
      return {
        error: "Credenciales incorrectas correo electronico no encontrado",
      };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { error: "Credenciales incorrectas." };
    }
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      admin: user.admin,
    };
    const token = generateToken(payload);
    return token;
  } catch (error) {
    return { error: `Error en el servidor ${error}` };
  }
};
