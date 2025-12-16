export const isAdmin = (req, res, next) => {
const user = req.user;

if (!user || !user.roles.includes('admin')) {
    return res.status(403).json({ message: 'Acceso denegado' });
}

    next();
};