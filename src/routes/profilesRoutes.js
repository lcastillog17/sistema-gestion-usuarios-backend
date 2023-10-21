const express = require('express');
const router = express.Router();
const { validator, profileDataValidations } = require('../utils/validators');
const perfilesController = require('../controllers/profilesController');
const { protectRoute } = require('../config/jwt');
const { checkUserRole } = require('../config/auth');

router.use('/:user_id?', protectRoute); // Protege todas las rutas de este archivo
router.use('/:user_id?', checkUserRole('Administrador')); // Requiere que el usuario tenga el rol de Administrador

// Ruta para crear un nuevo perfil
router.post('/:user_id', validator(profileDataValidations), perfilesController.createProfile);

// Ruta para obtener un perfil por su User ID
router.get('/:user_id', perfilesController.getProfileByUserId);

// Ruta para obtener un perfiles
router.get('/', perfilesController.getProfiles);

// Ruta para actualizar un perfil por su ID
router.put('/:user_id', validator(profileDataValidations), perfilesController.updateProfile);

// Ruta para eliminar un perfil por su ID
router.delete('/:user_id', perfilesController.deleteProfile);

module.exports = router;
