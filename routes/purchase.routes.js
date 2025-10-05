import {Router} from 'express'
import passport from 'passport'
import {PurchaseController} from '../app/controllers/purchase.controller.js'
import { onlyRole,requiereJwtCookie,tryGetUser } from '../middleware/auth.middleware.js';

const router = Router();

router.post("/",requiereJwtCookie,onlyRole('user'),tryGetUser,PurchaseController.createPurchase)

export default router;
