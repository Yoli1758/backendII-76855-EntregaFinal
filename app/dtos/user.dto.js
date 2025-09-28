import { hashPassword } from "../../utils/crypto.js";


export default class UserDTO{
    constructor(user) {
    this.id = user._id;
    this.name = user.firstName + " " + user.lastName;
    this.email = user.email;
    this.role = user.role;
}}
export function toUpdateUserDTO(body) {
    const out = {}

    if (body?.first_name) out.first_name = body.first_name;
    if (body?.last_name) out.last_name = body.last_name;
    if (body?.email) out.email = body.email;
    if (body?.age !== undefined) {
        const parsed = Number(body.age);
        if (!isNaN(parsed)) out.age = parsed;
    }
    if (body?.password) out.password = hashPassword(body.password);

    return out;
}