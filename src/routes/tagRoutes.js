const express = require('express')
const router = express.Router()
const tagController = require('../controllers/tagController')

// Crear una etiqueta
router.post('/', tagController.createTag)

// Obtener todas las etiquetas
router.get('/', tagController.getAllTags)

// Asociar una etiqueta a un post
router.post('/:postId/addTag/:tagId', tagController.addTagToPost)

module.exports = router
