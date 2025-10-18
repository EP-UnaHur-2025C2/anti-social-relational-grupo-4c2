const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

// CRUD de posts
router.post('/', postController.createPost)        // Crear post
router.get('/', postController.getAllPosts)        // Listar todos
router.get('/:id', postController.getPostById)     // Obtener por ID
router.put('/:id', postController.updatePost)      // Actualizar
router.delete('/:id', postController.deletePost)   // Eliminar

module.exports = router
