import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateToken } from "../jwt/jwt";


export const logging = async (session: string, password: string) => {
  try {
    const user = await User.findOne({
      where: { email: session },
      attributes: ["id", "firstName", "lastName", "email", "password", "admin"],
    });
    if (!user) {
      return {message: "Credenciales incorrectas correo electronico no encontrado"}
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return {message: 'Credenciales incorrectas.'}
    }
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      admin: user.admin
    }
    const token = generateToken(payload)
    return token
  } catch (error) {
    return {message: `Error en el servidor ${error}`}
  }
};
