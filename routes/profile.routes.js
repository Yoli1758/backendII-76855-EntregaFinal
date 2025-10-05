import { Router } from "express";
import { onlyRole, requiereJwtCookie,tryGetUser} from "../middleware/auth.middleware.js";
import { ProfileController } from "../app/controllers/profile.controller.js";

const router = Router();

router.get("/", requiereJwtCookie, onlyRole("admin","user"), tryGetUser,ProfileController.getUser)

router.put("/update",requiereJwtCookie,onlyRole("admin","user"),tryGetUser,ProfileController.updateUser)

export default router;
