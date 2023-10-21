const mysqlDatabase = require('../config/database/mysqlDatabase');
const User = require('../models/user');

// Controlador para crear un nuevo perfil
exports.createProfile = async (req, res) => {
  const user_id = req.params.user_id;
  const { first_name, last_name, birthdate, profile_picture } = req.body;

  const existingUser = await User.findById(user_id);
  if (!existingUser) {
    return res.status(400).json({ message: 'El usuario no existe' });
  }

  const sql = 'INSERT INTO profiles (user_id, first_name, last_name, birthdate, profile_picture) VALUES (?, ?, ?, ?, ?)';
  const values = [user_id, first_name, last_name, birthdate, profile_picture];

  mysqlDatabase.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al crear un perfil:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    res.status(201).json({ message: 'Perfil creado exitosamente' });
  });
};

// Controlador para obtener un perfil por su ID
exports.getProfileByUserId = (req, res) => {
  const user_id = req.params.user_id;

  const sql = 'SELECT * FROM profiles WHERE user_id = ?';
  mysqlDatabase.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error al obtener el perfil:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Perfil no encontrado' });
      return;
    }

    res.status(200).json(results[0]);
  });
};

// Controlador para obtener un perfiles
exports.getProfiles = (req, res) => {
  const sql = 'SELECT * FROM profiles';
  mysqlDatabase.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener el perfiles:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Perfil no encontrado' });
      return;
    }

    res.status(200).json(results);
  });
};

// Controlador para actualizar un perfil por su ID
exports.updateProfile = (req, res) => {
  const user_id = req.params.user_id;
  const { first_name, last_name, birthdate, profile_picture } = req.body;

  const sql = 'UPDATE profiles SET first_name = ?, last_name = ?, birthdate = ?, profile_picture = ? WHERE user_id = ?';
  const values = [first_name, last_name, birthdate, profile_picture, user_id];

  mysqlDatabase.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el perfil:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    res.status(200).json({ message: 'Perfil actualizado exitosamente' });
  });
};

// Controlador para eliminar un perfil por su ID
exports.deleteProfile = (req, res) => {
  const user_id = req.params.user_id;

  const sql = 'DELETE FROM profiles WHERE user_id = ?';
  mysqlDatabase.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el perfil:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    res.status(200).json({ message: 'Perfil eliminado exitosamente' });
  });
};
