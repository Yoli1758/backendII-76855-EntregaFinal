import { Router } from "express";

import { onlyRole, requiereJwtCookie } from "../middleware/auth.middleware.js";
import { UserController } from "../app/controllers/user.controller.js";


const router = Router();

//solo admin puede ver todos los usuarios
router.get("/", requiereJwtCookie, onlyRole("admin"), UserController.getAll)

router.get("/:id", requiereJwtCookie, onlyRole("admin", "user"), UserController.getById)

router.put("/:id", requiereJwtCookie, onlyRole("admin", "user"), UserController.update)

router.put("/me/update", requiereJwtCookie, onlyRole("user"), UserController.updateMe);

export default router;