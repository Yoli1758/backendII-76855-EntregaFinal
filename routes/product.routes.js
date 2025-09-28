import {Router} from 'express'
import passport from 'passport'
import { onlyRole } from '../middleware/auth.middleware.js'
import {ProductController} from '../app/controllers/product.controller.js'

const router = Router()

//solo admin puede crear productos

router.post(
    "/",passport.authenticate("jwt",{session:false}),onlyRole("admin"),ProductController.create
);

//tanto user como admin pueden ver todos los productos

router.get("/",passport.authenticate("jwt",{session:false}),onlyRole("admin","user"),ProductController.getProducts
);

//tanto admin o user pueden ver un producto por id
router.get("/:pid",passport.authenticate("jwt",{session:false}),onlyRole("admin","user"),ProductController.getProduct);

//solo admin puede actualizar productos

router.put("/:pid",passport.authenticate("jwt",{session:false}),onlyRole("admin"),ProductController.update)

//solo admin puede eliminar productos

router.delete("/:id",passport.authenticate("jwt",{session:false}),onlyRole("admin"),ProductController.delete)

//solo user puede agregar productos a su carrito
// router.post("/:id/add-cart",passport.authenticate("jwt",{session:false}),onlyRole("user"),ProductController.addToCart)


export default router;