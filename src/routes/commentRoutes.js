const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

// Rutas CRUD de comentarios
router.post('/', commentController.createComment)
router.get('/post/:postId', commentController.getCommentsByPost)
router.delete('/:id', commentController.deleteComment)

module.exports = router
