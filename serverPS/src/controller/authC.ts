import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateToken } from "../jwt/jwt";
type LOGIN = { session: string; password: string };
export const logging = async (login: LOGIN) => {
  try {
    const { session, password } = login;
    const response = await User.findOne({
      where: { email: login.session },
      attributes: ["id", "firstName", "lastName", "email", "password", "admin"],
    });
    const user = response?.dataValues;
    if (!user) {
      return {
        message: "Credenciales incorrectas correo electronico no encontrado.",
      };
    } else {
        const passwordMatch = await bcrypt.compare(
          login.password,
          user.password
        );
        if (!passwordMatch) {
          return { message: "Credenciales incorrectas." };
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
    }
  } catch (error) {
    return { error: `Error en el servidor ${error}` };
  }
};
