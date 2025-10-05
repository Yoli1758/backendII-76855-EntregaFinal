import { UserRepository } from "../repositories/user.repository.js";

export class UserService{

    static async getAllUser(){return UserRepository.getAll(); }

    static async getUserById(id){ return UserRepository.getById(id); }

    static async updateUser(id,data){return UserRepository.updateUser(id,data) }

    static  deleteUser(userId){ return  UserRepository.deleteUserById(userId) }
    
}