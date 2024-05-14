import { Router } from "express";
const router = Router();

import routerPing from './routerPing'
import registerR from "./registerR";
import authR from "./authR"

const root = '/api/ps'
const auth = '/auth'
const path = {
  ping: `${root}/ping`,
  registro: `${root}/register`,
  login: `${root}${auth}`,
}

router.use(path.ping, routerPing);
router.use(path.registro, registerR)
router.use(path.login, authR)

export default router;
