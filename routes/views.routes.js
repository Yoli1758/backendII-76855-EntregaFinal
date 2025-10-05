import {Router} from 'express'

import { tryGetUser } from '../middleware/auth.middleware.js';

const router = Router();



router.get("/",tryGetUser,(req,res)=>{ res.render("home")})

router.get("/products", tryGetUser, (req, res) => {  res.render("products");});

router.get("/login",(req,res)=>{ res.render("login")})

router.get("/register",(req,res)=>{res.render("register")})

router.get("/failregister", (req, res) => {res.render("failregister");});

export default router;