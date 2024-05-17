import { Router, Request, Response } from "express";
const router = Router();
//importacion de controladores
import { postUser, getAllUser } from "../controller/registerC";
//importacion de types
import { USERS } from "../type";
//creacion de una ruta post para registro de usuarios
router.post("/", async (req: Request, res: Response) => {
  try {
    //extraemos el usuario del body
    const user: USERS = req.body;
    //verificamos el usuario y le agregamos propiedades faltantes
    // si hacen falta propiedades en el user entonces retornamos un status 405 y un mensaje de error
    if (
      user?.firstName &&
      user?.email &&
      user?.lastName &&
      user?.userName &&
      user?.password
    ) {
      user.verify = false;
      user.experience = 1;
      user.job = 1;
      user.war = 1;
      user.store = 1;
      user.level = 1;
      user.nextLevel = user.level + 1;
      // envio de user al controlador para su creacion en la db
      const newUser = await postUser(user);
      // verificamos si la respuesta del controlador es un error ponemos estatus en 401 y enviamos el error
      //caso contrario status en 200 y enviamos el mensaje
      if (newUser.error) {
        return res.status(401).json(newUser.error);
      } else {
        return res.status(200).json(newUser.message);
      }
    } else {
      return res.status(405).json({ error: "Faltan datos para el registro" });
    }
  } catch (error) {
    // retornamos status 501 y el error si el servidor falla
    return res.status(501).json(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await getAllUser();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json(error);
  }
});

export default router;
