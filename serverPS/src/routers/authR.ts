import { Router, Request, Response } from "express";
const router = Router();
import { logging } from "../controller/authC";

router.post("/", async (req: Request, res: Response) => {
  const { session, password } = req.body;
  try {
    const token = await logging(session, password);
    if (token && typeof token !== 'string') {
      return res.status(404).json(token)
    } else {
    res.cookie("accessToken", token, {httpOnly: true, secure: true})
    return res.status(200).json({success: true})
    }
  } catch (error) {
    return res.status(500).json(error)
  }
});

export default router;
