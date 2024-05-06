import { Router } from "express";
const router = Router();

import routerUser from "./routerUser";
import routerPing from './routerPing'
import registerR from "./registerR";

const root = '/api/ps'
const auth = '/auth'
const path = {
  ping: `${root}/ping`,
  registro: `${root}/register`
}

router.use("/", routerUser);
router.use(path.ping, routerPing);
router.use(path.registro, registerR)

export default router;
