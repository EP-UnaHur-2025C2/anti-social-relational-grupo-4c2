const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Rutas CRUD
router.post('/', userController.createUser)        // Crear usuario
router.get('/', userController.getUsers)           // Listar todos
router.get('/:id', userController.getUserById)     // Buscar por ID
router.put('/:id', userController.updateUser)      // Actualizar
router.delete('/:id', userController.deleteUser)   // Eliminar

module.exports = router
