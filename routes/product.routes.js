import {Router} from 'express'
import passport from 'passport'
import { onlyRole,tryGetUser } from '../middleware/auth.middleware.js'
import {ProductController} from '../app/controllers/product.controller.js'

const router = Router()


router.post(
    "/",passport.authenticate("jwt",{session:false}),onlyRole("admin"),ProductController.create);

router.get("/",passport.authenticate("jwt",{session:false}),onlyRole("admin","user"),tryGetUser,ProductController.getProducts);


router.get("/:pid",passport.authenticate("jwt",{session:false}),onlyRole("admin","user"),ProductController.getProduct);



router.put("/:pid",passport.authenticate("jwt",{session:false}),onlyRole("admin"),ProductController.update)



router.delete("/:id",passport.authenticate("jwt",{session:false}),onlyRole("admin"),ProductController.delete)


router.get("/:pid/edit",passport.authenticate("jwt",{session:false}),onlyRole("admin"),tryGetUser,ProductController.getProduct) 


export default router;