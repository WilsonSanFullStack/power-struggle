import { Router, Request, Response } from "express";
const router = Router();
import { postUser, getAllUser } from "../controller/registerC";
import { USERS } from "../type";

router.post("/", async (req: Request, res: Response) => {
  try {
    const user: USERS = req.body;
    if (
      user?.firstName &&
      user?.email &&
      user?.lastName &&
      user?.userName &&
      user?.password
    ) {
      user.experience = 1;
      user.job = 1;
      user.war = 1;
      user.store = 1;
      user.level = 1;
      user.nextLevel = user.level + 1;
      const newUser = await postUser(user);
      if (newUser.error) {
        return res.status(401).json(newUser.error)
      } else {
        return res.status(200).json(newUser.message);
      }
    } else {
      return res.status(405).json({ error: "Faltan datos para el registro" });
    }
  } catch (error) {
    return res
      .status(501)
      .json(error);
  }
});

router.get("/", async (req:Request, res:Response) => {
  try {
    const users = await getAllUser()
    return res.status(200).json(users) 
  } catch (error) {
    return res.status(404).json(error)
  }
})

export default router;
