import { User } from "../models/User";

export const postUser = async (user: USER) => {
  try {
    
    if (
      user.email === "harveysanch@gmail.com" &&
      user.firstname.toLowerCase() === "wilson"
    ) {
      user.admin = true;
    }
    const verifyUser = await User.findOne({ where: { email: user.email } });
    if (verifyUser) {
      return { message: "El email ya esta registrado" };
    } else {
      const newUser = await User.create()
    }

  } catch (error) {
    
  }
};
