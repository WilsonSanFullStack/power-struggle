import { Router, Request, Response } from "express";
const router = Router();
import { postUser } from "../controller/registerC";

router.post("/", async (req: Request, res: Response) => {
  try {
    const user: USER = req.body;
    if (
      user.firstname &&
      user.email &&
      user.lastName &&
      user.userName &&
      user.password
    ) {
      user.experience = 1;
      user.job = 1;
      user.war = 1;
      user.store = 1;
      user.level = 1;
      user.nextLevel = user.level + 1;
      const newUser = await postUser(user);
      if (newUser) {
        return res.status(200).json({ message: "Registro exitoso" });
      }
    } else {
      return res.status(405).json({ error: "Faltan datos para el registro" });
    }
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Error en el servidor intente nuevamente" + error });
  }
});

export default router;
