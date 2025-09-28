import {Router} from 'express'
import passport from 'passport'
import {PurchaseController} from '../app/controllers/purchase.controller.js'
import { onlyRole } from '../middleware/auth.middleware.js';

const router = Router();

router.post("/",passport.authenticate('jwt',{session:false}),onlyRole('user'),PurchaseController.createPurchase)

export default router;
