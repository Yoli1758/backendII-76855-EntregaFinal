

import {UserDAO} from "../dao/user.dao.js";

const udao = UserDAO;
export  class UserRepository {


  static   getByEmail(email) {
        // console.log("voy a obtner el email...")
        return udao.findByEmail(email)
    }

    static async findByEmailWithCart(email) {
        console.log("verificando que el correo exista",email)
        const user = await udao.findByEmail(email);
        console.log("tengo el usuario",user)
        return user.populate("cart");
    }

   static  createUser(data) {
        // console.log("creando el usuario ",data)
        return udao.createUser(data);
    }
   
   static async getById(id) {
    console.log("estoy en getbyid")
    return  await udao.findById(id)
   
    }

   static saveResetToken(userId, token, exp) {
    console.log("vamos a guardar el token")
        return udao.saveResetToken(userId, token, exp);
    }


  static  getByResetToken(token) {
        return udao.findByResetToken(token);
    }

   static  updatePassword(userId, newPassword) {
        return udao.updatePassword(userId, newPassword);
    }
 
   static async getAll() {
        const users= await udao.findAll();
        return users
    }

    static updateUser(id, data) {
        return udao.findByIdAndUpdate(id, data, { new: true });
    }
}