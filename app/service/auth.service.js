import crypto from 'crypto'
import { UserRepository } from '../repositories/user.repository.js'
import { CartRepository } from '../repositories/cart.repository.js'
import { hashPassword, comparePassword } from '../../utils/crypto.js'
import { transporter } from '../../config/db/mailer.js'
import { config } from '../../config/db/config.js'




export const AuthService = {
    register: async (userData) => {
        const { first_name, last_name, age, email, password } = userData;
        if (!first_name || !last_name || !age || !email || !password) {
            throw new Error("All data is required");
        }

        // console.log("tengo los datos para registrar",email)
        const exist = await UserRepository.getByEmail(email);
        if (exist) {
            throw new Error("Email already registered...!!")
        }

        // console.log("el usuario no existe",exist)
        const cart = await CartRepository.createEmptyCart();

        const newUser = await UserRepository.createUser({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword(password),
            cart: cart._id,
            role: 'user'
        });
        // console.log("tengo el nuevo usuario",newUser)
        return newUser;

    },

    login: async (email, password) => {
        console.log("voya a loguearme con el email", email)
        const user = await UserRepository.findByEmailWithCart(email);

        console.log("obtuve el user", user)
        if (!user || !user.password) {
            throw new Error("invalid credentials");
        }
        console.log("comparando los password", password, user.password)
        const ok = comparePassword(password, user.password)

        if (!ok) {
            throw new Error("invalid credentials");
        }
        return {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
            cart: user.cart

        };
    },
    forgotPassword: async (email) => {
        const user = await UserRepository.getByEmail(email);
        if (!user) throw new Error("User not found");

        console.log("encontramos al usuario", user)
        const token = crypto.randomBytes(32).toString("hex");
        const exp = Date.now() + 60 * 60 * 1000;
        await UserRepository.saveResetToken(user._id, token, exp);
        const resetLink = `${config.usrURL}/reset-password/${token}`;
        console.log("viendo si pasa por aca ", resetLink)
        await transporter.sendMail({
            from: `"Ecommerce" <${config.userFrom}>`,
            to: user.email,
            subject: "Recuperación de contraseña",
            html: `
      <p>Has solicitado restablecer tu contraseña.</p>
      <p>Haz clic en el siguiente enlace (válido por 1 hora):</p>
      <a href="${resetLink}">Restablecer contraseña</a>
    `,
        });

        return true;
    },
    resetPassword: async (token, newPassword) => {

        const user = await UserRepository.getByResetToken(token);
        if (!user) throw new Error("Token inválido o expirado");

        const samePassword = comparePassword(newPassword, user.password);
        if (samePassword) throw new Error("La nueva contraseña no puede ser igual a la anterior");

        const hashedPassword = hashPassword(newPassword);
        await UserRepository.updatePassword(user._id, hashedPassword);

        return true;
    }
}
