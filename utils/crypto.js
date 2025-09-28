import bcrypt from 'bcrypt'


const ROUNDS = 10;

export function hashPassword(pass){
    return bcrypt.hashSync(pass,ROUNDS);
}

export function comparePassword(pass,hashed){
    return bcrypt.compareSync(pass,hashed)
}