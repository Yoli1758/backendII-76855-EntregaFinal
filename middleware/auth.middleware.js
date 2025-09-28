import passport from "passport";



export const requiereJwtCookie = passport.authenticate("jwt", { session: false });


export function onlyRole(...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user) return res.status(401).json({ status: "error",message: "User not authenticated" })
        if (!roles.includes(user.role)) return res.status(403).json({ status:"error",message: "Access denied" })
        next();
    }
}

