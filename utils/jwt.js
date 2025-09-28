import jwt from 'jsonwebtoken'

import {config} from '../config/db/config.js'

export function signJwt(payload){
return jwt.sign(payload,config.jwt.secret,{expiresIn: config.jwt.expires});
}

export function verifyJwt(token){
return jwt.verify(token,config.jwt.secret);
}