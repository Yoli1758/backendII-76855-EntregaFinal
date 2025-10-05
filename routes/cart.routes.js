import { Router } from "express";
import passport from 'passport'
import {onlyRole, tryGetUser} from '../middleware/auth.middleware.js'
import { CartController } from "../app/controllers/cart.controller.js";

const router = Router();



router.get('/',passport.authenticate('jwt',{session:false}),onlyRole('user'),tryGetUser,CartController.getCart);
router.post('/:pid',passport.authenticate('jwt',{session:false}),onlyRole('user'),tryGetUser,CartController.addProduct)
router.delete('/:pid',passport.authenticate('jwt',{session:false}),onlyRole('user'),tryGetUser,CartController.removeProduct)
router.put("/:pid",passport.authenticate('jwt',{session:false}),onlyRole('user'),tryGetUser,CartController.updateQuantityProduct)
router.delete("/",passport.authenticate('jwt',{session:false}),onlyRole('user'),tryGetUser,CartController.removeProductsCart)
router.post("/:pid/increment", passport.authenticate("jwt",{ session:false }), onlyRole("user"), tryGetUser,CartController.incrementProduct);
router.post("/:pid/decrement", passport.authenticate("jwt",{ session:false }), onlyRole("user"),tryGetUser, CartController.decrementProduct);

export default router;
