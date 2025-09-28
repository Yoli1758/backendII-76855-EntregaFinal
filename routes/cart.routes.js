import { Router } from "express";
import passport from 'passport'
import {onlyRole} from '../middleware/auth.middleware.js'
import { CartController } from "../app/controllers/cart.controller.js";

const router = Router();



router.get('/',passport.authenticate('jwt',{session:false}),onlyRole('user'),CartController.getCart);
router.post('/:pid',passport.authenticate('jwt',{session:false}),onlyRole('user'),CartController.addProduct)
router.delete('/:pid',passport.authenticate('jwt',{session:false}),onlyRole('user'),CartController.removeProduct)
router.put("/:pid",passport.authenticate('jwt',{session:false}),onlyRole('user'),CartController.updateQuantityProduct)
router.delete("/",passport.authenticate('jwt',{session:false}),onlyRole('user'),CartController.removeProductsCart)

export default router;
