const express = require("express");
const router = express.Router();
const { validator, userDataValidations, userLoginValidations } = require("../utils/validators");
const usersController = require("../controllers/usersController");
const { protectRoute } = require("../config/jwt");
const { checkUserRole } = require("../config/auth");

// Ruta para registrar un nuevo usuario con validación
router.post("/register", validator(userDataValidations), usersController.createUser);

// Ruta para iniciar sesión con validación
router.post("/login", validator(userLoginValidations), usersController.loginUser);

router.use("/:id?", protectRoute); // Protege todas las rutas de este archivo
router.use("/:id?", checkUserRole("Administrador")); // Requiere que el usuario tenga el rol de Administrador

// Ruta para obtener un usuario por su ID
router.get("/:id", usersController.getUserById);

// Ruta para actualizar un usuario por su ID con validación
router.put("/:id", validator(userDataValidations), usersController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete("/:id", usersController.deleteUser);

// Ruta para obtener la lista completa de usuarios
router.get("/", usersController.getAllUsers);

module.exports = router;
