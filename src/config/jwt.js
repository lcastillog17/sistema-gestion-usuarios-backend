const jwt = require("jsonwebtoken");
const config = require("./config");

// Función para generar un token JWT
const generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    username: user.username,
    roles: user.roles,
  };
  const options = {
    expiresIn: "1h", // El token expira en 1 hora
  };
  return jwt.sign(payload, config.jwt.secret, options);
};

// Función para verificar un token JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    return null; // Token inválido
  }
};

// Middleware para proteger rutas con JWT
const protectRoute = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Token inválido" });
  }

  req.user = decoded; // Almacena los datos del usuario en el objeto de solicitud
  next();
};

module.exports = { generateToken, verifyToken, protectRoute };
