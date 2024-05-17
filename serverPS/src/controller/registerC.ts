// importacion del modelo user
import { User } from "../models/User";
// importacion de types
import { USERS } from "../type";
//importacion de bibliotecas
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Resend } from "resend";
// configuracion de los .env
dotenv.config();
// ejecucion de resend
const resend = new Resend(process.env.resendApiKey);
// funcion postUser recibe a user para crear un registro en la db
export const postUser = async (user: USERS) => {
  try {
    // if para verificar usuarios y hacerlos administradores
    if (
      user?.email === "harveysanch@gmail.com" &&
      user?.firstName?.toLowerCase() === "wilson"
    ) {
      user.admin = true;
    }
    // verifica si un usuario ya existe con ese correo retorna error en caso contrario continua la funcion
    const verifyUser = await User.findOne({ where: { email: user.email } });
    if (verifyUser) {
      return { error: "El email ya esta registrado" };
    } else {
      const password = user.password;
      const saltRounds = 10;
      // verificamos si tiene contraseña y hacemos un hashed
      if (password) {
        const hashedPassword = await new Promise<string>((resolve, reject) => {
          bcrypt.hash(
            password,
            saltRounds,
            (err: Error | null, hash: string) => {
              if (err) {
                reject(err);
              } else {
                resolve(hash);
              }
            }
          );
        });
        // cambiamos el valor de la contraseña por el hashed
        user.password = hashedPassword;
      }
      // creacion de un codigo para verificar el usuario
      const timestamp = Date.now().toString(36); // Convierte la marca de tiempo a base 36
      const randomPart = Math.random().toString(36).substring(2, 4); // Genera una parte aleatoria
      const uniqueCode = (timestamp + randomPart).slice(-5);
      //asignamos el codigo
      user.code = uniqueCode;
      // envio de correo con informacion del usuario y el codigo de verificacion
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [`${user.email}`],
        subject: "Bienvenido Power Struggle",
        html: `
        <h1>BIENVENIDO A POWER STRUGGLE</h1>
        <ul>
        <li>nombre: ${user.firstName}</li>
        <li>apellido: ${user.lastName}</li>
        <li>apodo: ${user.userName}</li>
        <li>email: ${user.email}</li>
        <li>ip: ${user.ipAddress}</li>
        <li>codigo: ${user.code}</li>
        </ul>`,
      });
      // revisamos si se envio correctamente o si hubo error y creamos el usuario en caso de envio correcto
      // en caso de positivo entonces retornamos un mensaje con el userName
      // de lo contrario retornamos un mensaje con el error
      if (error) {
        return { message: `Correo no enviado ${error.name}, ${error.message}` };
      } else {
        const newUser = await User.create(user as User);
        return {
          message: `Usuario creado correctamente con username ${newUser.dataValues.userName}.`,
        };
      }
    }
  } catch (error) {
    // error sii el servidor falla
    return { message: `Error en el servidor ${error}` };
  }
};
// funcion get para consultar todos los usuarios registrados
export const getAllUser = async () => {
  try {
    const users = await User.findAll({
      //tomamos solo las siguientes propiedades el modelo
      // attributes: ["id", "userName", "email"],
    });
    // retornamos con las anteriores propiedades
    return users;
  } catch (error) {
    // retornamos un message si el servidor falla
    return { message: `error en el servidor ${error}` };
  }
};
// funcion para consultar un solo usuario
export const getUser = async (id: string) => {
  try {
    // consulta de un usuario por id
    const user = await User.findByPk(id);
    //verificacion de existencia del usuario en caso positivo retornamos el usuario en caso contrario un error
    if (user?.dataValues.id) {
      return user;
    } else {
      return { message: `Error no se encontro el usuario buscado.` };
    }
  } catch (error) {
    // retornamos un message si el servidor falla
    return { message: `Error en el servidor ${error}.` };
  }
};

// funcion para verificar un usuario

// funcion para actualizar un usuario

// funcion para eliminar un usuario
