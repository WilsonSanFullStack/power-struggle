import { Router } from "express";
const router = Router();
// importacion de rutas
import routerPing from "./routerPing";
import registerR from "./registerR";
import authR from "./authR";

// creacion de la url base
const root = "/api/ps";
const auth = "/auth";
//asignacion de url base a las rutas
const path = {
  ping: `${root}/ping`,
  registro: `${root}/register`,
  login: `${root}${auth}`,
};
// carga de router con las url base 
router.use(path.ping, routerPing);
router.use(path.registro, registerR);
router.use(path.login, authR);
//exportacion del router
export default router;
