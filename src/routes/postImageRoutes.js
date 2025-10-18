const express = require('express')
const router = express.Router()
const postImageController = require('../controllers/postImageController')

// Asociar imágenes a posts
router.post('/', postImageController.addImage)               // Crear imagen
router.get('/post/:postId', postImageController.getImagesByPost) // Listar imágenes de un post
router.delete('/:id', postImageController.deleteImage)       // Eliminar imagen

module.exports = router
