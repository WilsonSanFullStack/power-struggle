// importacion de herramientas
import bcrypt from "bcryptjs";
//importacion de modelos
import { User } from "../models/User";
//importacion de funciones
import { generateToken } from "../jwt/jwt";
// creacion de type para login
type LOGIN = { session: string; password: string };
// funcion logging
export const logging = async (login: LOGIN) => {
  try {
// consulta a la db
    const response = await User.findOne({
      where: { email: login.session },
      attributes: ["id", "firstName", "lastName", "email", "password", "admin"],
    });
    // pasandon los dataValues a user
    const user = response?.dataValues;
    // verificamos si existe user si no existe retornamos un error caso contrario comparamos la contraseña
    if (!user) {
      return {
        message: "Credenciales incorrectas correo electronico no encontrado.",
      };
    } else {
        const passwordMatch = await bcrypt.compare(
          login.password,
          user.password
        );
// verificamos si la contraseña es correcta si no lo es retornamos error
        if (!passwordMatch) {
          return { message: "Credenciales incorrectas." };
        } else {
          // creacion del payload para el token
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        admin: user.admin,
      };
      //generamos el token
      const token = generateToken(payload);
      //retornamos el token
      return token;
    }
    }
  } catch (error) {
    // error del servidor
    return { error: `Error en el servidor ${error}` };
  }
};
