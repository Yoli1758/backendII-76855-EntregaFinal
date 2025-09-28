import { UserRepository } from "../repositories/user.repository.js";

export class UserService{

    static async getAllUser(){
        return UserRepository.getAll();
    }

    static async getUserById(id){
        console.log("estoy en getUserByID:",id)
        return UserRepository.getById(id);
    }

    static async updateUser(id,data){
        return UserRepository.update(id,data)
    }
}