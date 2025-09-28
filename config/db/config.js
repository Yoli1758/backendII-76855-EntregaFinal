import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.resolve(process.cwd(),'.env')});

export const config = {
    port: process.env.PORT || 3000,
    mongodb_atlas : process.env.MONGO_URI_ATLAS,
    mongodb_local: process.env.MONGO_URI,
    session_secret:process.env.SESSION_SECRET,
    adminEmail:process.env.ADMINEMAIL,
    adminPass:process.env.ADMINPASS,
    userHost:process.env.SMTP_HOST,
    userPort:process.env.SMTP_PORT,
    userSecure:process.env.SMTP_SECURE,
    userUser:process.env.SMTP_USER,
    userPass:process.env.SMTP_PASS,
    userFrom:process.env.SMTP_FROM,
    usrURL:process.env.FRONTEND_URL,
    jwt:{
        secret:process.env.JWT_SECRET,
        expires:process.env.JWT_EXPIRES,
        cookieName:process.env.JWT_COOKIE_NAME
    },
    passport:{
        jwt:process.env.PASSPORT_JWT_STRATEGY_NAME,
        login:process.env.PASSPORT_LOCAL_STRATEGY_LOGIN,
        register:process.env.PASSPORT_LOCAL_STRATEGY_REGISTER
    }
    
};