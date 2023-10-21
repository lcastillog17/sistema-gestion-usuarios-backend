// Middleware para verificar el rol del usuario
const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user; // Obtiene los datos del usuario del objeto de solicitud

    const hasRequiredRole = user.roles.includes(requiredRole);
    const isUserOwner = user.userId === req.params.id;
    const isProfileOwner = user.userId === req.params.user_id;

    const userHasPermission = hasRequiredRole || isUserOwner || isProfileOwner;

    if (user && userHasPermission) {
      next(); // El usuario tiene el rol requerido, continúa con la siguiente función
    } else {
      res.status(403).json({ message: "Acceso no autorizado" });
    }
  };
};

module.exports = { checkUserRole };
