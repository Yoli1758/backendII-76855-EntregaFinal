import { Router } from "express";
import { requiereJwtCookie,onlyRole,tryGetUser } from "../middleware/auth.middleware.js";
import { UserController } from "../app/controllers/user.controller.js";
import { ProductController } from "../app/controllers/product.controller.js";

const router = Router();

router.get("/users", requiereJwtCookie, onlyRole("admin"),tryGetUser,UserController.getAll )
router.get("/editProducts", requiereJwtCookie, onlyRole("admin"),tryGetUser,ProductController.getProducts )

export default router;