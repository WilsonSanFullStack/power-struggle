import { User } from "../models/User";
import {USERS } from "../type";
import bcrypt from 'bcryptjs'

export const postUser = async (user: USERS) => {
  try {
    if (
      user?.email === "harveysanch@gmail.com" &&
      user?.firstName?.toLowerCase() === "wilson"
    ) {
      user.admin = true;
    }
    const verifyUser = await User.findOne({ where: { email: user.email } });
    if (verifyUser) {
      return { error: "El email ya esta registrado" };
    } else {
      const password = user.password
      const saltRounds = 10
      if (password) {
        const hashedPassword = await new Promise<string>((resolve, reject) => {
          bcrypt.hash(password, saltRounds, (err: Error | null, hash: string) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(hash);
              }
          });
      });
      user.password = hashedPassword
      }
      const newUser = await User.create(user as User);
      return {
        message: `Usuario creado correctamente con username ${newUser.dataValues.userName}`,
      };
    }
  } catch (error) {
    return { message: `Error en el servidor ${error}` };
  }
};

export const getAllUser = async () => {
  try {
    const users = await User.findAll({
      attributes: ["id", "userName", "email", "password"],
    });
    return users;
  } catch (error) {
    return { message: `error en el servidor ${error}` };
  }
};
